import { PlayArrow, Star } from '@mui/icons-material';
import React, { useEffect, useRef } from 'react';
import moviePoster from './../../assests/movie-poster.png';
import { useGetSeasonQuery } from './../../services/TMDB.js';
import { IMAGE_BASE_LINK } from './../../utils/constants.js';
import { formatDate, hasAired, pad } from './../../utils/format.js';
import { Loader, SectionHeader } from './../index.js';
import useStyles from './SeasonsAndEpisodes.style.js';

// Seasons rail of a TV show and the episodes rail of the selected season.
// current = { season, episode } being played; onPlay(season, episode) is only offered when canPlay.
export default function SeasonsAndEpisodes({ showId, seasons, selectedSeason, onSelectSeason, current, canPlay, onPlay }) {
    const classes = useStyles();
    const episodesRail = useRef(null);
    const { data: season, isFetching } = useGetSeasonQuery({ id: showId, seasonNumber: selectedSeason }, { skip: !showId || selectedSeason === undefined });
    const episodes = season?.episodes ?? [];
    const currentEpisode = current?.season === selectedSeason ? current?.episode : null;

    // Bring the playing episode into view without moving the page
    useEffect(() => {
        const rail = episodesRail.current;
        const card = rail?.querySelector('[aria-current="true"]');
        rail?.scrollTo({ left: card ? card.offsetLeft : 0, behavior: 'smooth' });
    }, [currentEpisode, selectedSeason, isFetching]);

    const totalEpisodes = seasons.reduce((total, item) => total + (item?.episode_count ?? 0), 0);

    return <>
        <section>
            <SectionHeader title='Seasons'>{seasons.length} season{seasons.length === 1 ? '' : 's'} · {totalEpisodes} episodes</SectionHeader>
            <div className={classes.seasons}>
                {seasons.map((item) => (
                    <button
                        key={item.id ?? item.season_number}
                        type='button'
                        aria-pressed={item.season_number === selectedSeason}
                        className={`${classes.season} ${item.season_number === selectedSeason ? classes.seasonActive : ''}`}
                        onClick={() => onSelectSeason(item.season_number)}
                    >
                        <img
                            className={classes.seasonPoster}
                            src={item.poster_path ? `${IMAGE_BASE_LINK}/${item.poster_path}` : moviePoster}
                            alt={item.name}
                            loading='lazy'
                        />
                        <b className={classes.seasonName}>{item.name}</b>
                        <span className={classes.seasonMeta}>
                            {item.episode_count} eps{item.air_date && ` · ${item.air_date.split('-')[0]}`}
                        </span>
                    </button>
                ))}
            </div>
        </section>

        <section>
            <SectionHeader title={season?.name ? `${season.name} episodes` : 'Episodes'}>
                {episodes.length > 0 && `${episodes.length} episodes`}
            </SectionHeader>
            {isFetching ? <Loader size='3rem' /> : <ol className={classes.episodes} ref={episodesRail}>
                {episodes.map((episode) => {
                    const number = episode.episode_number;
                    const aired = hasAired(episode.air_date);
                    const isCurrent = currentEpisode === number;
                    return <li
                        key={episode.id ?? number}
                        aria-current={isCurrent || undefined}
                        className={`${classes.episode} ${isCurrent ? classes.episodeCurrent : ''} ${aired ? '' : classes.episodeUpcoming}`}
                    >
                        <div className={classes.still}>
                            {episode.still_path && <img src={`${IMAGE_BASE_LINK}/${episode.still_path}`} alt='' loading='lazy' />}
                            {aired && canPlay && <button
                                type='button'
                                className={classes.play}
                                aria-label={`Play episode ${number}, ${episode.name}`}
                                onClick={() => onPlay(selectedSeason, number)}
                            >
                                <PlayArrow />
                            </button>}
                            <span className={classes.code}>E{pad(number)}</span>
                            {episode.runtime > 0 && <span className={classes.runtime}>{episode.runtime}m</span>}
                        </div>
                        <div className={classes.text}>
                            <b className={classes.title}>{episode.name}</b>
                            <div className={classes.meta}>
                                {aired ? <>
                                    <span>{formatDate(episode.air_date)}</span>
                                    {episode.vote_count > 0 && <span className={classes.rating}><Star />{episode.vote_average?.toFixed(1)}</span>}
                                    {isCurrent && <span className={classes.now}>Now playing</span>}
                                </> : <span className={classes.airs}>{episode.air_date ? `Airs ${formatDate(episode.air_date)}` : 'Air date not announced'}</span>}
                            </div>
                            {episode.overview && <p className={classes.overview}>{episode.overview}</p>}
                        </div>
                    </li>
                })}
            </ol>}
        </section>
    </>
}
