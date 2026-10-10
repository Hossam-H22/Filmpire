import { ArrowBack, Language } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { DetailSkeleton, ErrorState, MovieList, PageContainer, Pagination, SectionHeader, Tabs } from './../../Components/index.js';
import { NotFound } from './../../Pages/index.js';
import moviePoster from './../../assests/movie-poster.png';
import { useGetActorCreditsQuery, useGetActorsDetailsQuery } from './../../services/TMDB.js';
import { IMAGE_BASE_LINK, SYSTEM_NAME } from './../../utils/constants.js';
import { formatDate } from './../../utils/format.js';
import useStyles from './Actors.style.js';

const LONG_BIOGRAPHY = 700;
const CREDITS_PER_PAGE = 20;

// One card per title, most popular first; an actor can hold several roles in the same show
function getUniqueCredits(cast = []) {
    const credits = new Map();
    cast.forEach((credit) => {
        const key = `${credit.media_type}-${credit.id}`;
        const existing = credits.get(key);
        credits.set(key, existing ? {
            ...existing,
            character: [existing.character, credit.character].filter(Boolean).join(' / '),
            episode_count: Math.max(existing.episode_count ?? 0, credit.episode_count ?? 0),
        } : credit);
    });
    return [...credits.values()].sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0));
}

// 'as Mara Quill · 28 eps' for TV, 'as Ruth · 2024' for movies
function getCreditSubtitle(credit) {
    const role = credit.character ? `as ${credit.character}` : null;
    const detail = credit.media_type === 'tv'
        ? credit.episode_count && `${credit.episode_count} ep${credit.episode_count === 1 ? '' : 's'}`
        : credit.release_date?.split('-')[0];
    return [role, detail].filter(Boolean).join(' · ') || undefined;
}

export default function Actors() {
    const classes = useStyles();
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const filmography = useRef(null);
    const [page, setPage] = useState(1);
    const [creditType, setCreditType] = useState('all');
    const [showFullBio, setShowFullBio] = useState(false);
    // currentData is only ever this actor's, so another actor's page never shows while this one loads
    const { currentData: data, isFetching, error, refetch } = useGetActorsDetailsQuery(id);
    const { currentData: credits } = useGetActorCreditsQuery(id);

    // Another actor starts again from the first page of all credits
    useEffect(() => {
        setPage(1);
        setCreditType('all');
        setShowFullBio(false);
    }, [id]);

    // Back leaves the site when this page was opened directly, so go home instead
    function goBack() {
        if (location.key === 'default') navigate('/');
        else navigate(-1);
    }

    if (!data && isFetching) return <DetailSkeleton />
    if (error?.status === 404) return <NotFound message="We couldn't find that person - Back to home" />
    if (error || !data) return <ErrorState title="We couldn't load this person" onRetry={refetch} />

    const allCredits = getUniqueCredits(credits?.cast);
    const movieCount = allCredits.filter((credit) => credit.media_type === 'movie').length;
    const tvCount = allCredits.length - movieCount;
    const shownCredits = creditType === 'all' ? allCredits : allCredits.filter((credit) => credit.media_type === creditType);
    const totalPages = Math.ceil(shownCredits.length / CREDITS_PER_PAGE);
    const pageCredits = { results: shownCredits.slice((page - 1) * CREDITS_PER_PAGE, page * CREDITS_PER_PAGE) };
    const counts = [movieCount > 0 && `${movieCount} movies`, tvCount > 0 && `${tvCount} series`].filter(Boolean).join(' · ');

    function selectCreditType(value) {
        setCreditType(value);
        setPage(1);
    }

    const biography = data?.biography || 'Sorry, no biography yet...';
    const isLongBio = biography.length > LONG_BIOGRAPHY;
    const details = [
        { label: 'Born', value: data?.birthday && formatDate(data.birthday) },
        { label: 'Place', value: data?.place_of_birth },
        { label: 'Died', value: data?.deathday && formatDate(data.deathday) },
        { label: 'Popularity', value: data?.popularity?.toFixed(1) },
    ].filter(({ value }) => value);

    return <>
        <Helmet>
            <title>{`${data?.name} | ${SYSTEM_NAME}`}</title>
        </Helmet>
        <PageContainer className={classes.top}>
            <img
                className={classes.image}
                src={data?.profile_path ? `${IMAGE_BASE_LINK}/${data?.profile_path}` : moviePoster}
                alt={data?.name}
            />
            <div className={classes.details}>
                <div className={classes.eyebrow}>
                    {data?.known_for_department ?? 'Acting'}{counts && ` · ${counts}`}
                </div>
                <h1 className={classes.name}>{data?.name}</h1>
                {details.length > 0 && <div className={classes.kv}>
                    {details.map(({ label, value }) => (
                        <div key={label}><span>{label}</span><b>{value}</b></div>
                    ))}
                </div>}
                <p className={`${classes.bio} ${isLongBio && !showFullBio ? classes.bioClamped : ''}`}>{biography}</p>
                {isLongBio && <button type='button' className={classes.readMore} onClick={() => setShowFullBio((prev) => !prev)}>
                    {showFullBio ? 'Show less' : 'Read full biography'}
                </button>}
                <div className={classes.actions}>
                    {data?.imdb_id && <Button
                        variant='contained'
                        target='_blank'
                        rel='noopener noreferrer'
                        href={`https://www.imdb.com/name/${data?.imdb_id}`}
                        endIcon={<Language />}
                    >IMDb</Button>}
                    <Button startIcon={<ArrowBack />} onClick={goBack} color='inherit' variant='outlined'> Back </Button>
                </div>
            </div>
        </PageContainer>
        {allCredits.length > 0 && <PageContainer component='section' ref={filmography} sx={{ pt: 4, scrollMarginTop: 64 }}>
            <SectionHeader title='Filmography'>{shownCredits.length} credits · Page {page} of {totalPages}</SectionHeader>
            {movieCount > 0 && tvCount > 0 && <Box sx={{ mb: 3 }}>
                <Tabs
                    label='Credit type'
                    value={creditType}
                    onChange={selectCreditType}
                    tabs={[
                        { label: `All · ${allCredits.length}`, value: 'all' },
                        { label: `Movies · ${movieCount}`, value: 'movie' },
                        { label: `TV · ${tvCount}`, value: 'tv' },
                    ]}
                />
            </Box>}
            <MovieList movies={pageCredits} showType={creditType === 'all'} getSubtitle={getCreditSubtitle} />
            <Pagination curruntPage={page} setPage={setPage} totalPages={totalPages} scrollTarget={filmography} />
        </PageContainer>}
    </>
}
