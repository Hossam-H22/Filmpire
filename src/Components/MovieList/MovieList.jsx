import React from 'react'
import useStyles from './MovieList.style.js'
import { Grid } from '@mui/material';
import { Movie } from '..'

export default function MovieList({ movies, numberOfMovies }) {
    const classes = useStyles();

    return <>
        <Grid container className={classes.moviesContainer}>
            { movies?.results?.slice(0, numberOfMovies)?.map((movie, index)=>(
                <Movie key={index} movie={movie} index={index} />
            )) }
        </Grid>
    </>
}
