import { Close, Search as SearchIcon } from '@mui/icons-material'
import { IconButton, InputBase } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { browseUrl } from './../../utils/browse.js'
import { MEDIA_HOME } from './../../utils/constants.js'
import useStyles from './Search.style.js'


// Search box of movies and shows; submits with Enter, the keyboard's search key or the search button.
// onSearch runs after a search is submitted, e.g. to close the menu it sits in
export default function Search({ fullWidth, autoFocus, onSearch }) {
    const classes = useStyles();
    const input = useRef(null);
    const [searchParams] = useSearchParams();
    const urlQuery = searchParams.get('s') ?? '';
    const [query, setQuery] = useState(urlQuery);
    const navigate = useNavigate();
    const { mediaType } = useSelector((state) => state.curruntGenreOrCategory);

    // Keep the input in step with the URL (reload, back/forward, leaving search)
    useEffect(() => {
        setQuery(urlQuery);
    }, [urlQuery]);

    function handleSubmit(e) {
        e.preventDefault();
        const trimmedQuery = query.trim();
        if (!trimmedQuery && !urlQuery) return;
        navigate(trimmedQuery ? browseUrl(mediaType, { s: trimmedQuery }) : MEDIA_HOME[mediaType]);
        input.current?.blur();
        onSearch?.();
    }

    // Clearing an active search also leaves the search results
    function clear() {
        setQuery('');
        input.current?.focus();
        if (urlQuery) navigate(MEDIA_HOME[mediaType]);
    }

    return <form role='search' onSubmit={handleSubmit} className={`${classes.searchContainer} ${fullWidth ? classes.fullWidth : ''}`}>
        <IconButton type='submit' size='small' className={classes.iconButton} aria-label='Search'>
            <SearchIcon className={classes.icon} />
        </IconButton>
        <InputBase
            inputRef={input}
            autoFocus={autoFocus}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='Search movies & shows…'
            className={classes.input}
            inputProps={{ 'aria-label': 'Search movies and TV shows', type: 'search', enterKeyHint: 'search' }}
        />
        {query && <IconButton size='small' className={classes.iconButton} aria-label='Clear search' onClick={clear}>
            <Close className={classes.icon} />
        </IconButton>}
    </form>
}
