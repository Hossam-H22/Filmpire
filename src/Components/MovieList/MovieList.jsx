import React from 'react'
import { Grid } from '@mui/material';
import MovieCard from './../MovieCard/MovieCard.jsx';

export default function MovieList({ movies, numberOfMovies, excludeFirst }) {
    const startFrom = excludeFirst ? 1 : 0;

    return <Grid container sx={{ width: '100%', display: 'flex', justifyContent: 'center', padding: '0 20px' }}>
        {movies?.results?.slice(startFrom, numberOfMovies)?.map((movie) => (
            <MovieCard key={movie?.id} movie={movie} />
        ))}
    </Grid>
}
