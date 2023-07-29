import React from 'react'
import useStyles from './MovieList.style.js'
import { Grid } from '@mui/material';
import { Movie } from '..'

export default function MovieList({ movies, numberOfMovies, excludeFirst }) {
    const classes = useStyles();

    const startFrom = excludeFirst? 1 : 0;

    return <>
        <Grid container className={classes.moviesContainer}>
            { movies?.results?.slice(startFrom, numberOfMovies)?.map((movie, index)=>(
                <Movie key={index} movie={movie} index={index} />
            )) }
        </Grid>
    </>
}
