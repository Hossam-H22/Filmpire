import React from 'react';
import MovieCard from './../MovieCard/MovieCard.jsx';
import useStyles from './MovieList.style.js';

// variant 'grid' wraps into rows; 'rail' is a single horizontally scrolling row.
// mediaType, showType and getSubtitle(movie) are passed on to each MovieCard.
// onPreview(movie) and onPreviewEnd() fire as a card is hovered or focused and left.
export default function MovieList({ movies, numberOfMovies, variant = 'grid', mediaType, showType, getSubtitle, onPreview, onPreviewEnd }) {
    const classes = useStyles();

    return <div className={variant === 'rail' ? classes.rail : classes.grid}>
        {movies?.results?.slice(0, numberOfMovies)?.map((movie) => (
            <MovieCard
                key={`${movie?.media_type ?? mediaType}-${movie?.id}`}
                movie={movie}
                mediaType={mediaType}
                showType={showType}
                subtitle={getSubtitle?.(movie)}
                onPreview={onPreview && (() => onPreview(movie))}
                onPreviewEnd={onPreviewEnd}
            />
        ))}
    </div>
}
