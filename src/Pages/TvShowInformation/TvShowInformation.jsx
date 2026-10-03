import { Language, NavigateBefore, NavigateNext, NotificationsNone, PlayArrow, Star } from '@mui/icons-material';
import { Box, Button, Chip, CircularProgress, MenuItem, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { ActorCard, CollapseLine, Loader, MovieList, Notice, PageContainer, SavedListButtons, SeasonsAndEpisodes, SectionHeader, Tabs, TrailerCard } from './../../Components/index.js';
import { NotFound } from './../../Pages/index.js';
import moviePoster from './../../assests/movie-poster.png';
import { selectGenreOrCategory } from './../../features/currentGenreOrCategory.js';
import { useGetRecommendationsQuery, useGetSeasonQuery, useGetTvShowQuery } from './../../services/TMDB.js';
import { IMAGE_BACKDROP_BASE_LINK, IMAGE_BASE_LINK, SYSTEM_NAME } from './../../utils/constants.js';
import { episodeCode, formatDate, formatRuntime, hasAired, pad } from './../../utils/format.js';
import useSavedLists from './../../utils/useSavedLists.js';
import useWatchLink, { buildWatchUrl } from './../../utils/useWatchLink.js';
import useMovieStyles from './../MovieInformation/MovieInformation.style.js';
import useTvStyles from './TvShowInformation.style.js';

// Whole days from today until a TMDB air date
function daysUntil(airDate) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return Math.round((new Date(`${airDate}T00:00:00`) - today) / 86400000);
}

export default function TvShowInformation() {
    const classes = { ...useMovieStyles(), ...useTvStyles() };
    const dispatch = useDispatch();
    const { id } = useParams();
    const [isEpisodeLoading, setIsEpisodeLoading] = useState(true);
    const [isWatchOpen, setIsWatchOpen] = useState(false);
    // { season, episode } picked by the user; before that, the first episode
    const [playing, setPlaying] = useState(null);
    const [browsedSeason, setBrowsedSeason] = useState(null);
    const [selectedServerBase, setSelectedServerBase] = useState(null);

    const { data, isFetching, error } = useGetTvShowQuery(id);
    const { data: recommendations } = useGetRecommendationsQuery({ mediaType: 'tv', list: 'recommendations', movie_id: id });
    const savedLists = useSavedLists('tv', id);
    const watchLink = useWatchLink(id, data?.first_air_date, 'tv');
    const selectedServer = watchLink.servers.find((server) => server.baseUrl === selectedServerBase);

    // Specials (season 0) only show when a show has nothing else
    const regularSeasons = data?.seasons?.filter((season) => season?.season_number > 0 && season?.episode_count > 0) ?? [];
    const seasons = regularSeasons.length > 0 ? regularSeasons : (data?.seasons ?? []);
    const current = playing ?? (seasons[0] ? { season: seasons[0].season_number, episode: 1 } : null);
    const selectedSeason = browsedSeason ?? current?.season;

    const { data: currentSeason } = useGetSeasonQuery({ id, seasonNumber: current?.season }, { skip: !current });
    const airedEpisodes = currentSeason?.episodes?.filter((episode) => hasAired(episode?.air_date)) ?? [];
    const currentEpisode = currentSeason?.episodes?.find((episode) => episode?.episode_number === current?.episode);
    const seasonIndex = seasons.findIndex((season) => season?.season_number === current?.season);
    const previousSeason = seasons[seasonIndex - 1];
    const nextSeason = seasons[seasonIndex + 1];
    const hasPrevious = current?.episode > 1 || Boolean(previousSeason);
    const hasNext = current?.episode < airedEpisodes.length || hasAired(nextSeason?.air_date);
    const playerUrl = selectedServer && current && buildWatchUrl(selectedServer.baseUrl, { id, season: current.season, episode: current.episode });

    // A new show starts from its first episode
    useEffect(() => {
        setPlaying(null);
        setBrowsedSeason(null);
        setIsWatchOpen(false);
    }, [id]);

    // Default to the first server that responds and keep it while slower ones finish checking
    useEffect(() => {
        if (!selectedServer && watchLink.servers.length > 0) {
            setSelectedServerBase(watchLink.servers[0].baseUrl);
        }
    }, [selectedServer, watchLink.servers]);

    useEffect(() => {
        setIsEpisodeLoading(true);
    }, [playerUrl]);

    function playEpisode(season, episode) {
        setPlaying({ season, episode });
        setBrowsedSeason(season);
        setIsWatchOpen(true);
        document.getElementById('watch')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function playPrevious() {
        if (current.episode > 1) playEpisode(current.season, current.episode - 1);
        else playEpisode(previousSeason.season_number, previousSeason.episode_count);
    }

    function playNext() {
        if (current.episode < airedEpisodes.length) playEpisode(current.season, current.episode + 1);
        else playEpisode(nextSeason.season_number, 1);
    }

    if (isFetching) return <Loader size='8rem' />

    if (error) return <NotFound message='Something has gone wrong - Go back' path='/tv' />

    const firstYear = data?.first_air_date?.split('-')[0];
    const lastYear = data?.last_air_date?.split('-')[0];
    const years = firstYear && (data?.in_production ? `${firstYear}–` : lastYear && lastYear !== firstYear ? `${firstYear}–${lastYear}` : firstYear);
    const isReturning = data?.in_production || data?.status === 'Returning Series';
    const episodeRuntime = data?.episode_run_time?.[0] ?? data?.last_episode_to_air?.runtime;
    const network = data?.networks?.[0]?.name;
    const cast = data?.credits?.cast?.slice(0, 15).filter((character) => character?.profile_path);
    const trailers = data?.videos?.results?.slice(0, 10);
    const nextEpisode = data?.next_episode_to_air;
    const imdbId = data?.external_ids?.imdb_id;
    const facts = [
        { label: 'First aired', value: formatDate(data?.first_air_date) },
        { label: 'Last aired', value: formatDate(data?.last_air_date) },
        { label: 'Seasons', value: data?.number_of_seasons ?? '—' },
        { label: 'Episodes', value: data?.number_of_episodes ?? '—' },
        { label: 'Network', value: network ?? '—' },
        { label: 'Status', value: data?.status ?? '—' },
        { label: 'Created by', value: data?.created_by?.map((person) => person?.name).join(', ') || '—' },
        { label: 'Language', value: data?.spoken_languages?.[0]?.english_name ?? '—' },
    ];

    function scrollToTrailers() {
        document.getElementById('trailers')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    return <>
        <Helmet>
            <title>{data?.name} | {SYSTEM_NAME}</title>
            <meta name="description" content={data?.overview} />
            <meta name="keywords" content={data?.genres?.map((genre) => genre?.name).join(', ')} />
            <meta property="og:title" content={data?.name} />
            <meta property="og:description" content={data?.overview} />
            <meta property="og:image" content={`${IMAGE_BASE_LINK}/${data?.poster_path}`} />
            <meta property="og:url" content={window.location.href} />
            <meta property="og:type" content="video.tv_show" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={data?.name} />
            <meta name="twitter:description" content={data?.overview} />
            <meta name="twitter:image" content={`${IMAGE_BASE_LINK}/${data?.poster_path}`} />
            <link rel="canonical" href={window.location.href} />
            <script type="application/ld+json">
                {JSON.stringify({
                    '@context': 'https://schema.org',
                    '@type': 'TVSeries',
                    name: data?.name,
                    description: data?.overview,
                    image: `${IMAGE_BASE_LINK}/${data?.poster_path}`,
                    startDate: data?.first_air_date,
                    numberOfSeasons: data?.number_of_seasons,
                    numberOfEpisodes: data?.number_of_episodes,
                    aggregateRating: {
                        '@type': 'AggregateRating',
                        ratingValue: data?.vote_average,
                        ratingCount: data?.vote_count,
                    },
                })}
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
                    alt={data?.name}
                />
                <div className={classes.info}>
                    <div className={classes.eyebrow}>{data?.genres?.map((genre) => genre?.name).slice(0, 3).join(' · ')}</div>
                    <h1 className={classes.title}>{data?.name}</h1>
                    {data?.tagline && <p className={classes.tagline}>{data?.tagline}</p>}
                    <div className={classes.meta}>
                        <span className={classes.score}><Star className={classes.star} />{data?.vote_average?.toFixed(1)} / 10</span>
                        {years && <><span className={classes.dot} /><span className={classes.mono}>{years}</span></>}
                        <span className={classes.dot} />
                        <span className={classes.mono}>{data?.number_of_seasons} season{data?.number_of_seasons === 1 ? '' : 's'} · {data?.number_of_episodes} eps</span>
                        {episodeRuntime > 0 && <><span className={classes.dot} /><span className={classes.mono}>~{formatRuntime(episodeRuntime)} / ep</span></>}
                        {network && <><span className={classes.dot} /><span>{network}</span></>}
                        {data?.status && <span className={`${classes.status} ${isReturning ? classes.statusLive : ''}`}>{isReturning ? 'Returning' : data.status}</span>}
                    </div>
                    <div className={classes.genres}>
                        {data?.genres?.map((genre) => (
                            <Chip
                                key={genre?.id}
                                label={genre?.name}
                                component={Link}
                                to='/tv'
                                clickable
                                variant='outlined'
                                className={classes.genreChip}
                                onClick={() => dispatch(selectGenreOrCategory(genre?.id))}
                            />
                        ))}
                    </div>
                    <div className={classes.actions}>
                        {watchLink.status === 'available' && current && <Button variant='contained' startIcon={<PlayArrow />} onClick={() => playEpisode(current.season, current.episode)}>
                            Watch {episodeCode(current.season, current.episode)}
                        </Button>}
                        {trailers?.length > 0 && <Button
                            variant={watchLink.status === 'available' ? 'text' : 'contained'}
                            className={watchLink.status === 'available' ? classes.ghost : ''}
                            startIcon={<PlayArrow />}
                            onClick={scrollToTrailers}
                        >Trailer</Button>}
                        <SavedListButtons savedLists={savedLists} className={classes.ghost} activeClassName={classes.ghostOn} />
                        {imdbId && <Button
                            className={classes.ghost}
                            target='_blank'
                            rel='noopener noreferrer'
                            href={`https://www.imdb.com/title/${imdbId}`}
                            endIcon={<Language />}
                        >IMDb</Button>}
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
                    {data?.overview && <section>
                        <SectionHeader title='Overview' />
                        <p className={classes.prose}>{data?.overview}</p>
                    </section>}
                    {seasons.length > 0 && <SeasonsAndEpisodes
                        showId={id}
                        seasons={seasons}
                        selectedSeason={selectedSeason}
                        onSelectSeason={setBrowsedSeason}
                        current={isWatchOpen ? current : null}
                        canPlay={watchLink.status === 'available'}
                        onPlay={playEpisode}
                    />}
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
                    <div className={classes.anchor} id='watch'>
                        <CollapseLine
                            title='Watch now'
                            unmountOnExit
                            open={isWatchOpen}
                            onOpenChange={setIsWatchOpen}
                            disabled={watchLink.status !== 'available'}
                            badge={watchLink.status === 'checking' ? (
                                <Chip size='small' variant='outlined' label='Checking availability…' icon={<CircularProgress size={12} color='inherit' />} />
                            ) : watchLink.status === 'unavailable' && (
                                <Chip size='small' color='warning' variant='outlined' label='Watching this show is not available right now' />
                            )}
                        >
                            {current && <div className={classes.watchBody}>
                                <div className={classes.picker}>
                                    <TextField
                                        select
                                        size='small'
                                        label='Season'
                                        value={current.season}
                                        onChange={(e) => playEpisode(Number(e.target.value), 1)}
                                        className={classes.select}
                                    >
                                        {seasons.map((season) => (
                                            <MenuItem key={season.season_number} value={season.season_number} disabled={!hasAired(season.air_date)}>
                                                {season.name}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                    <TextField
                                        select
                                        size='small'
                                        label='Episode'
                                        value={airedEpisodes.some((episode) => episode.episode_number === current.episode) ? current.episode : ''}
                                        onChange={(e) => playEpisode(current.season, Number(e.target.value))}
                                        className={`${classes.select} ${classes.episodeSelect}`}
                                    >
                                        {airedEpisodes.map((episode) => (
                                            <MenuItem key={episode.episode_number} value={episode.episode_number}>
                                                E{pad(episode.episode_number)} · {episode.name}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </div>
                                {watchLink.servers.length > 1 && <Tabs
                                    label='Watch servers'
                                    tabs={watchLink.servers.map((server) => ({ label: server.name, value: server.baseUrl }))}
                                    value={selectedServer?.baseUrl}
                                    onChange={setSelectedServerBase}
                                />}
                                <Box sx={{ position: 'relative' }}>
                                    {isEpisodeLoading && <div className={classes.movieLoader} >
                                        <Loader size='4rem' removeMargin />
                                    </div>}
                                    {playerUrl && <iframe
                                        key={playerUrl}
                                        title={`${data?.name} ${episodeCode(current.season, current.episode)}`}
                                        src={playerUrl}
                                        allow='autoplay'
                                        allowFullScreen
                                        scrolling="no"
                                        onLoad={() => setIsEpisodeLoading(false)}
                                        className={classes.player}
                                    />}
                                </Box>
                                <div className={classes.watchFooter}>
                                    <Button size='small' variant='outlined' color='inherit' startIcon={<NavigateBefore />} disabled={!hasPrevious} onClick={playPrevious}>
                                        Previous
                                    </Button>
                                    <span className={classes.nowPlaying}>
                                        <b>{episodeCode(current.season, current.episode)}</b>{currentEpisode?.name && ` · ${currentEpisode.name}`}
                                    </span>
                                    <Button size='small' variant='contained' endIcon={<NavigateNext />} disabled={!hasNext} onClick={playNext}>
                                        Next episode
                                    </Button>
                                </div>
                            </div>}
                        </CollapseLine>
                    </div>
                </div>

                <aside className={classes.aside}>
                    {nextEpisode?.air_date && <div className={`${classes.sideCard} ${classes.nextCard}`}>
                        <span className={`${classes.sideLabel} ${classes.nextLabel}`}><NotificationsNone fontSize='inherit' /> Next episode</span>
                        <b className={classes.nextTitle}>
                            {episodeCode(nextEpisode.season_number, nextEpisode.episode_number)}{nextEpisode.name && ` · ${nextEpisode.name}`}
                        </b>
                        <span className={classes.nextDate}>
                            {formatDate(nextEpisode.air_date)}
                            {daysUntil(nextEpisode.air_date) > 0 && ` · in ${daysUntil(nextEpisode.air_date)} day${daysUntil(nextEpisode.air_date) === 1 ? '' : 's'}`}
                        </span>
                    </div>}
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
                <MovieList movies={recommendations} numberOfMovies={12} variant='rail' mediaType='tv' />
            </section>}
        </PageContainer>

        <Notice notice={savedLists.notice} onClose={() => savedLists.setNotice(null)} />
    </>
}
