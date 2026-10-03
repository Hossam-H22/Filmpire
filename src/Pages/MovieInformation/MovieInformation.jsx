import { Language, PlayArrow, Star } from '@mui/icons-material';
import { Box, Button, Chip, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { Helmet } from "react-helmet";
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { ActorCard, CollapseLine, Loader, MovieList, Notice, PageContainer, SavedListButtons, SectionHeader, Tabs, TrailerCard } from './../../Components/index.js';
import { NotFound } from './../../Pages/index.js';
import moviePoster from './../../assests/movie-poster.png';
import { selectGenreOrCategory } from './../../features/currentGenreOrCategory.js';
import { useGetMovieQuery, useGetRecommendationsQuery } from './../../services/TMDB.js';
import { IMAGE_BACKDROP_BASE_LINK, IMAGE_BASE_LINK, SYSTEM_NAME } from './../../utils/constants.js';
import { formatDate, formatRuntime } from './../../utils/format.js';
import useSavedLists from './../../utils/useSavedLists.js';
import useWatchLink from './../../utils/useWatchLink.js';
import useStyles from './MovieInformation.style.js';

export default function MovieInformation() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [isMovieLoading, setIsMovieLoading] = useState(true);
    const { id } = useParams();

    const { data, isFetching, error } = useGetMovieQuery(id);
    const { data: recommendations } = useGetRecommendationsQuery({ list: 'recommendations', movie_id: id });
    const savedLists = useSavedLists('movie', id);
    const watchLink = useWatchLink(id, data?.release_date);
    const [selectedServerUrl, setSelectedServerUrl] = useState(null);
    const selectedServer = watchLink.servers.find((server) => server.url === selectedServerUrl);

    // Default to the first server that responds and keep it while slower ones finish checking
    useEffect(() => {
        if (!selectedServer && watchLink.servers.length > 0) {
            setSelectedServerUrl(watchLink.servers[0].url);
        }
    }, [selectedServer, watchLink.servers]);

    useEffect(() => {
        setIsMovieLoading(true);
    }, [selectedServerUrl]);

    function formatMoney(amount) {
        if (!amount) return '—';
        return amount >= 1e9 ? `$${(amount / 1e9).toFixed(2)}B` : `$${(amount / 1e6).toFixed(1)}M`;
    }


    if (isFetching) return <Loader size='8rem' />

    if (error) return <NotFound message='Something has gone wrong - Go back' path='/' />

    const year = data?.release_date?.split('-')[0];
    const director = data?.credits?.crew?.find((member) => member?.job === 'Director')?.name;
    const cast = data?.credits?.cast?.slice(0, 15).filter((character) => character?.profile_path);
    const trailers = data?.videos?.results?.slice(0, 10);
    const facts = [
        { label: 'Released', value: formatDate(data?.release_date) },
        { label: 'Runtime', value: data?.runtime ? `${data.runtime} min` : '—' },
        { label: 'Budget', value: formatMoney(data?.budget) },
        { label: 'Revenue', value: formatMoney(data?.revenue) },
        { label: 'Director', value: director ?? '—' },
        { label: 'Status', value: data?.status ?? '—' },
    ];

    function scrollToTrailers() {
        document.getElementById('trailers')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    return <>
        <Helmet>
            <title>{data?.title} | {SYSTEM_NAME}</title>
            <meta name="description" content={data?.overview} />
            <meta name="keywords" content={data?.genres?.map((genre) => genre?.name).join(', ')} />
            <meta name="image" content={`${IMAGE_BASE_LINK}/${data?.poster_path}`} />
            <meta property="og:title" content={data?.title} />
            <meta property="og:description" content={data?.overview} />
            <meta property="og:image" content={`${IMAGE_BASE_LINK}/${data?.poster_path}`} />
            <meta property="og:url" content={window.location.href} />
            <meta property="og:type" content="video.movie" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={data?.title} />
            <meta name="twitter:description" content={data?.overview} />
            <meta name="twitter:image" content={`${IMAGE_BASE_LINK}/${data?.poster_path}`} />
            <link rel="canonical" href={window.location.href} />
            <script type="application/ld+json">
                {`
                    {
                        "@context": "https://schema.org",
                        "@type": "Movie",
                        "name": "${data.title}",
                        "description": "${data.overview}",
                        "image": "${IMAGE_BASE_LINK}/${data?.poster_path}",
                        "datePublished": "${data.release_date}",
                        "aggregateRating": {
                            "@type": "AggregateRating",
                            "ratingValue": "${data.vote_average}",
                            "ratingCount": "${data.vote_count}"
                        }
                    }
            `}
            </script>
        </Helmet>
        <Box component='section' className={classes.hero}>
            {data?.backdrop_path && <div
                className={classes.backdrop}
                style={{ backgroundImage: `url(${IMAGE_BACKDROP_BASE_LINK}/${data?.backdrop_path})` }}
            />}
            <div className={classes.fade} />
            <PageContainer className={classes.heroContent}>
                <img
                    className={classes.poster}
                    src={data?.poster_path ? `${IMAGE_BASE_LINK}/${data?.poster_path}` : moviePoster}
                    alt={data?.title}
                />
                <div className={classes.info}>
                    <div className={classes.eyebrow}>{data?.genres?.map((genre) => genre?.name).slice(0, 3).join(' · ')}</div>
                    <h1 className={classes.title}>{data?.title}</h1>
                    {data?.tagline && <p className={classes.tagline}>{data?.tagline}</p>}
                    <div className={classes.meta}>
                        <span className={classes.score}><Star className={classes.star} />{data?.vote_average?.toFixed(1)} / 10</span>
                        {year && <><span className={classes.dot} /><span>{year}</span></>}
                        {formatRuntime(data?.runtime) && <><span className={classes.dot} /><span className={classes.mono}>{formatRuntime(data?.runtime)}</span></>}
                        {data?.spoken_languages?.length > 0 && <><span className={classes.dot} /><span>{data?.spoken_languages[0]?.english_name ?? data?.spoken_languages[0]?.name}</span></>}
                    </div>
                    <div className={classes.genres}>
                        {data?.genres?.map((genre) => (
                            <Chip
                                key={genre?.id}
                                label={genre?.name}
                                component={Link}
                                to='/'
                                clickable
                                variant='outlined'
                                className={classes.genreChip}
                                onClick={() => dispatch(selectGenreOrCategory(genre?.id))}
                            />
                        ))}
                    </div>
                    <div className={classes.actions}>
                        {trailers?.length > 0 && <Button variant='contained' startIcon={<PlayArrow />} onClick={scrollToTrailers}>Trailer</Button>}
                        <SavedListButtons savedLists={savedLists} className={classes.ghost} activeClassName={classes.ghostOn} />
                        <Button
                            className={classes.ghost}
                            target='_blank'
                            rel='noopener noreferrer'
                            href={`https://www.imdb.com/title/${data?.imdb_id}`}
                            endIcon={<Language />}
                        >IMDb</Button>
                        {data?.homepage && <Button
                            className={classes.ghost}
                            target='_blank'
                            rel='noopener noreferrer'
                            href={data?.homepage}
                            endIcon={<Language />}
                        >Website</Button>}
                    </div>
                </div>
            </PageContainer>
        </Box>

        <PageContainer>
            <div className={classes.twoCol}>
                <div className={classes.main}>
                    <section>
                        <SectionHeader title='Overview' />
                        <p className={classes.prose}>{data?.overview}</p>
                    </section>
                    {cast?.length > 0 && <section>
                        <SectionHeader title='Top cast' />
                        <div className={classes.cast}>
                            {cast.map((character) => (
                                <ActorCard character={character} key={character?.credit_id ?? character?.id} />
                            ))}
                        </div>
                    </section>}
                    {trailers?.length > 0 && <section id='trailers' className={classes.anchor}>
                        <SectionHeader title='Trailers' />
                        <div className={classes.trailers}>
                            {trailers.map((video) => (
                                <TrailerCard video={video} key={video.id} />
                            ))}
                        </div>
                    </section>}
                    <CollapseLine
                        title='Watch now'
                        unmountOnExit
                        disabled={watchLink.status !== 'available'}
                        badge={watchLink.status === 'checking' ? (
                            <Chip size='small' variant='outlined' label='Checking availability…' icon={<CircularProgress size={12} color='inherit' />} />
                        ) : watchLink.status === 'unavailable' && (
                            <Chip size='small' color='warning' variant='outlined' label='Watching movie not available right now' />
                        )}
                    >
                        {watchLink.servers.length > 1 && <Box sx={{ mb: 2 }}>
                            <Tabs
                                label='Watch servers'
                                tabs={watchLink.servers.map((server) => ({ label: server.name, value: server.url }))}
                                value={selectedServer?.url}
                                onChange={setSelectedServerUrl}
                            />
                        </Box>}
                        <Box sx={{ position: 'relative' }}>
                            {isMovieLoading && <div className={classes.movieLoader} >
                                <Loader size='4rem' removeMargin />
                            </div>}
                            {selectedServer && <iframe
                                key={selectedServer.url}
                                autoPlay
                                title='Movie'
                                src={selectedServer.url}
                                allow='autoplay'
                                allowFullScreen
                                scrolling="no"
                                onLoad={() => setIsMovieLoading(false)}
                                className={classes.player}
                            />}
                        </Box>
                    </CollapseLine>
                </div>

                <aside className={classes.aside}>
                    <div className={classes.sideCard}>
                        <span className={classes.sideLabel}>TMDB rating</span>
                        <div className={classes.rateBar}>
                            <span className={classes.rateNumber}>{data?.vote_average?.toFixed(1)}</span>
                            <div className={classes.track}><span style={{ width: `${(data?.vote_average ?? 0) * 10}%` }} /></div>
                        </div>
                        <span className={classes.mono}>{data?.vote_count?.toLocaleString()} votes</span>
                    </div>
                    <dl className={classes.facts}>
                        {facts.map(({ label, value }) => (
                            <div key={label}>
                                <dt>{label}</dt>
                                <dd>{value}</dd>
                            </div>
                        ))}
                    </dl>
                </aside>
            </div>

            {recommendations?.total_results > 0 && <section className={classes.recommendations}>
                <SectionHeader title='More like this' />
                <MovieList movies={recommendations} numberOfMovies={12} variant='rail' />
            </section>}
        </PageContainer>

        <Notice notice={savedLists.notice} onClose={() => savedLists.setNotice(null)} />
    </>
}
