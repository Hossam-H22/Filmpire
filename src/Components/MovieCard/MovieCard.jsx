import { Star } from '@mui/icons-material';
import React from 'react';
import { Link } from 'react-router-dom';
import moviePoster from './../../assests/movie-poster.png';
import { IMAGE_BASE_LINK } from './../../utils/constants.js';
import useStyles from './MovieCard.style.js';

export default function MovieCard({ movie }) {
    const classes = useStyles();
    const year = movie?.release_date?.split('-')[0];

    return <Link className={classes.card} to={`/movie/${movie?.id}`} >
        <div className={classes.poster}>
            <img alt={movie?.title} className={classes.image} loading='lazy'
                src={movie?.poster_path ? `${IMAGE_BASE_LINK}${movie?.poster_path}` : moviePoster} />
            {movie?.vote_count > 0 && <span className={classes.badge}>
                <Star className={classes.star} />{movie?.vote_average?.toFixed(1)}
            </span>}
            <div className={classes.overlay}>
                <p className={classes.overview}>{movie?.overview}</p>
                <span className={classes.more}>View details →</span>
            </div>
        </div>
        <h3 className={classes.title}>{movie?.title}</h3>
        {year && <span className={classes.sub}>{year}</span>}
    </Link>
}
