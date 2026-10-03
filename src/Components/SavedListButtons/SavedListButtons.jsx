import { Bookmark, BookmarkBorder, Favorite, FavoriteBorder } from '@mui/icons-material';
import { Button } from '@mui/material';
import React from 'react';

// Favorite and Watchlist buttons for the result of useSavedLists
export default function SavedListButtons({ savedLists, className, activeClassName }) {
    const { isFavorited, isWatchlisted, pendingList, toggleFavorite, toggleWatchlist } = savedLists;

    return <>
        <Button
            className={`${className} ${isFavorited ? activeClassName : ''}`}
            startIcon={isFavorited ? <Favorite /> : <FavoriteBorder />}
            onClick={toggleFavorite}
            disabled={pendingList === 'favorite'}
        >
            {isFavorited ? 'Favorited' : 'Favorite'}
        </Button>
        <Button
            className={`${className} ${isWatchlisted ? activeClassName : ''}`}
            startIcon={isWatchlisted ? <Bookmark /> : <BookmarkBorder />}
            onClick={toggleWatchlist}
            disabled={pendingList === 'watchlist'}
        >
            {isWatchlisted ? 'In watchlist' : 'Watchlist'}
        </Button>
    </>
}
