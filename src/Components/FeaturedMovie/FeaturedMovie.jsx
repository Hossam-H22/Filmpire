import { Star } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetGenresQuery } from '../../services/TMDB.js';
import { IMAGE_BACKDROP_BASE_LINK } from './../../utils/constants.js';
import { PageContainer } from './../index.js';
import useStyles from './FeaturedMovie.style.js';


// movie is a TMDB movie or TV show; mediaType falls back to the item's own media_type (search results).
// carousel, when given, turns the banner into a slideshow: { count, paused, onNext, onPause(paused) }.
// Each title stays for SLIDE_DURATION before onNext is called; the countdown starts over after a pause.
const SLIDE_DURATION = 7000;

export default function FeaturedMovie({ movie, eyebrow, mediaType, carousel }) {
    const classes = useStyles();
    const type = movie?.media_type ?? mediaType ?? 'movie';
    const { data: genres } = useGetGenresQuery(type);
    const backdropPath = movie?.backdrop_path;
    // The outgoing backdrop stays underneath while the new one fades in over it
    const [backdrops, setBackdrops] = useState(() => backdropPath ? [backdropPath] : []);

    useEffect(() => {
        if (!backdropPath) return;
        setBackdrops((list) => [...list.filter((path) => path !== backdropPath).slice(-1), backdropPath]);
    }, [backdropPath]);

    // Kept in a ref so the countdown isn't restarted by every render of the page
    const onNext = useRef(carousel?.onNext);
    onNext.current = carousel?.onNext;
    const slideKey = `${type}-${movie?.id}`;
    const autoplay = carousel?.count > 1 && !carousel?.paused;

    useEffect(() => {
        if (!autoplay) return;
        const timer = setTimeout(() => onNext.current?.(), SLIDE_DURATION);
        return () => clearTimeout(timer);
    }, [autoplay, slideKey]);

    if (!movie) return null;

    const title = movie?.title ?? movie?.name;
    const date = movie?.release_date ?? movie?.first_air_date;

    const genreNames = movie?.genre_ids
        ?.map((genreId) => genres?.genres?.find(({ id }) => id === genreId)?.name)
        .filter(Boolean)
        .slice(0, 3);

    // Hovering or focusing the banner holds the slideshow so it can be read and clicked
    const pauseHandlers = carousel && {
        onMouseEnter: () => carousel.onPause(true),
        onMouseLeave: () => carousel.onPause(false),
        onFocus: () => carousel.onPause(true),
        onBlur: (event) => !event.currentTarget.contains(event.relatedTarget) && carousel.onPause(false),
    };

    return <Box component='section' className={classes.hero} aria-roledescription={carousel && 'carousel'} {...pauseHandlers}>
        {backdrops.map((path) => <div
            key={path}
            className={`${classes.backdrop} ${path === backdropPath ? classes.backdropIn : ''}`}
            style={{ backgroundImage: `url(${IMAGE_BACKDROP_BASE_LINK}/${path})` }}
        />)}
        <div className={classes.fade} />
        <PageContainer className={classes.content}>
            <div key={slideKey} className={classes.slide} aria-live={carousel?.paused ? 'polite' : 'off'}>
                <div className={classes.eyebrow}>{eyebrow ?? 'Featured'}</div>
                <h1 className={classes.title}>{title}</h1>
                <div className={classes.meta}>
                    <span className={classes.score}><Star className={classes.star} />{movie?.vote_average?.toFixed(1)}</span>
                    <span className={classes.mono}>{movie?.vote_count?.toLocaleString()} votes</span>
                    {date && <><span className={classes.dot} /><span>{date.split('-')[0]}</span></>}
                    {type === 'tv' && <><span className={classes.dot} /><span>TV series</span></>}
                    {genreNames?.length > 0 && <><span className={classes.dot} /><span>{genreNames.join(' · ')}</span></>}
                </div>
                <p className={classes.overview}>{movie?.overview}</p>
            </div>
            {/* Its link covers the whole banner (see moreInfo), so any click on it opens the details page */}
            <Button
                variant='contained'
                component={Link}
                to={`/${type}/${movie?.id}`}
                className={classes.moreInfo}
                aria-label={`More info about ${title}`}
                disableRipple
            >
                More info
            </Button>
        </PageContainer>
    </Box>
}
