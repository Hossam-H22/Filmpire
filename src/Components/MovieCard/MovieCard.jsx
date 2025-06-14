import { Grid, Rating, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import moviePoster from './../../assests/movie-poster.png';
import { IMAGE_BASE_LINK } from './../../utils/constants.js';
import useStyles from './MovieCard.style.js';

export default function MovieCard({ movie }) {
    const classes = useStyles();

    return <Grid item xs={12} sm={6} md={4} lg={3} xl={2} sx={{ padding: '0 10px', marginBottom: '20px' }} >
        <Link className={classes.links} to={`/movie/${movie?.id}`} >
            <img alt={movie?.title} className={classes.image}
                src={movie?.poster_path ? `${IMAGE_BASE_LINK}${movie?.poster_path}` : moviePoster} />
            <Typography className={classes.title} variant='h5'>{movie?.title}</Typography>
            <Tooltip disableTouchListener title={`${movie?.vote_average} / 10`}>
                <div>
                    <Rating readOnly value={movie?.vote_average / 2} precision={0.1} />
                </div>
            </Tooltip>
        </Link>
    </Grid>
}
