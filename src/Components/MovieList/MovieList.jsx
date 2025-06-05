import React from 'react'
import { Grid } from '@mui/material';
import { Movie } from '..'

export default function MovieList({ movies, numberOfMovies, excludeFirst }) {
    const startFrom = excludeFirst ? 1 : 0;

    return <Grid container>
        {movies?.results?.slice(startFrom, numberOfMovies)?.map((movie) => (
            <Movie key={movie?.id} movie={movie} />
        ))}
    </Grid>
}
