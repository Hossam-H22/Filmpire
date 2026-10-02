import { ArrowBack, Language } from '@mui/icons-material';
import { Button } from '@mui/material';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate, useParams } from 'react-router-dom';
import { Loader, MovieList, PageContainer, Pagination, SectionHeader } from './../../Components/index.js';
import { NotFound } from './../../Pages/index.js';
import moviePoster from './../../assests/movie-poster.png';
import { useGetActorsDetailsQuery, useGetMoviesByActorIdQuery } from './../../services/TMDB.js';
import { IMAGE_BASE_LINK } from './../../utils/constants.js';
import useStyles from './Actors.style.js';

const LONG_BIOGRAPHY = 700;

export default function Actors() {
    const classes = useStyles();
    const { id } = useParams();
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [showFullBio, setShowFullBio] = useState(false);
    const { data, isFetching, error } = useGetActorsDetailsQuery(id);
    const { data: movies } = useGetMoviesByActorIdQuery({ id, page });

    if (isFetching) return <Loader size='8rem' />
    if (error) return <NotFound path={`/`} message='Something has gone wrong - Go back' />

    const biography = data?.biography || 'Sorry, no biography yet...';
    const isLongBio = biography.length > LONG_BIOGRAPHY;
    const details = [
        { label: 'Born', value: data?.birthday && new Date(data.birthday).toDateString() },
        { label: 'Place', value: data?.place_of_birth },
        { label: 'Died', value: data?.deathday && new Date(data.deathday).toDateString() },
        { label: 'Popularity', value: data?.popularity?.toFixed(1) },
    ].filter(({ value }) => value);

    return <>
        <Helmet>
            <title>Actor: {data?.name}</title>
        </Helmet>
        <PageContainer className={classes.top}>
            <img
                className={classes.image}
                src={data?.profile_path ? `${IMAGE_BASE_LINK}/${data?.profile_path}` : moviePoster}
                alt={data?.name}
            />
            <div className={classes.details}>
                <div className={classes.eyebrow}>
                    {data?.known_for_department ?? 'Acting'}{movies?.total_results > 0 && ` · ${movies.total_results} movies`}
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
                    <Button startIcon={<ArrowBack />} onClick={() => navigate(-1)} color='inherit' variant='outlined'> Back </Button>
                </div>
            </div>
        </PageContainer>
        {movies?.total_results > 0 && <PageContainer component='section' sx={{ pt: 4 }}>
            <SectionHeader title='Filmography'>Page {page} of {movies?.total_pages}</SectionHeader>
            <MovieList movies={movies} numberOfMovies={20} />
            <Pagination curruntPage={page} setPage={setPage} totalPages={movies?.total_pages} />
        </PageContainer>}
    </>
}
