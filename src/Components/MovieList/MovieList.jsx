import React from 'react';
import MovieCard from './../MovieCard/MovieCard.jsx';
import useStyles from './MovieList.style.js';

// variant 'grid' wraps into rows; 'rail' is a single horizontally scrolling row.
// mediaType, showType and getSubtitle(movie) are passed on to each MovieCard.
export default function MovieList({ movies, numberOfMovies, excludeFirst, variant = 'grid', mediaType, showType, getSubtitle }) {
    const classes = useStyles();
    const startFrom = excludeFirst ? 1 : 0;

    return <div className={variant === 'rail' ? classes.rail : classes.grid}>
        {movies?.results?.slice(startFrom, numberOfMovies)?.map((movie) => (
            <MovieCard
                key={`${movie?.media_type ?? mediaType}-${movie?.id}`}
                movie={movie}
                mediaType={mediaType}
                showType={showType}
                subtitle={getSubtitle?.(movie)}
            />
        ))}
    </div>
}
