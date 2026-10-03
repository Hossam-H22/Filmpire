import { Star } from '@mui/icons-material';
import React from 'react';
import { Link } from 'react-router-dom';
import moviePoster from './../../assests/movie-poster.png';
import { IMAGE_BASE_LINK } from './../../utils/constants.js';
import useStyles from './MovieCard.style.js';

// movie is a TMDB movie or TV show. mediaType falls back to the item's own media_type (search, credits).
// showType tags movies too, for lists that mix both; subtitle replaces the year line.
export default function MovieCard({ movie, mediaType, showType, subtitle }) {
    const classes = useStyles();
    const type = movie?.media_type ?? mediaType ?? 'movie';
    const isTv = type === 'tv';
    const title = movie?.title ?? movie?.name;
    const year = (movie?.release_date ?? movie?.first_air_date)?.split('-')[0];

    return <Link className={classes.card} to={`/${type}/${movie?.id}`} >
        <div className={classes.poster}>
            <img alt={title} className={classes.image} loading='lazy'
                src={movie?.poster_path ? `${IMAGE_BASE_LINK}${movie?.poster_path}` : moviePoster} />
            {movie?.vote_count > 0 && <span className={classes.badge}>
                <Star className={classes.star} />{movie?.vote_average?.toFixed(1)}
            </span>}
            {(isTv || showType) && <span className={`${classes.type} ${isTv ? classes.typeTv : ''}`}>{isTv ? 'TV' : 'Movie'}</span>}
            <div className={classes.overlay}>
                <p className={classes.overview}>{movie?.overview}</p>
                <span className={classes.more}>View details →</span>
            </div>
        </div>
        <h3 className={classes.title}>{title}</h3>
        {subtitle ? <span className={classes.sub}>{subtitle}</span> : year && <span className={classes.sub}>{year}</span>}
    </Link>
}
