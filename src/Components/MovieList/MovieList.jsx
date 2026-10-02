import React from 'react';
import MovieCard from './../MovieCard/MovieCard.jsx';
import useStyles from './MovieList.style.js';

// variant 'grid' wraps into rows; 'rail' is a single horizontally scrolling row
export default function MovieList({ movies, numberOfMovies, excludeFirst, variant = 'grid' }) {
    const classes = useStyles();
    const startFrom = excludeFirst ? 1 : 0;

    return <div className={variant === 'rail' ? classes.rail : classes.grid}>
        {movies?.results?.slice(startFrom, numberOfMovies)?.map((movie) => (
            <MovieCard key={movie?.id} movie={movie} />
        ))}
    </div>
}
