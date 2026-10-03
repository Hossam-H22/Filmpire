import { Search as SearchIcon } from '@mui/icons-material'
import { InputBase } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { MEDIA_HOME } from './../../utils/constants.js'
import useStyles from './Search.style.js'


export default function Search({ fullWidth, onSearch }) {
    const classes = useStyles();
    const [searchParams] = useSearchParams();
    const urlQuery = searchParams.get('s') ?? '';
    const [query, setQuery] = useState(urlQuery);
    const navigate = useNavigate();
    const { mediaType } = useSelector((state) => state.curruntGenreOrCategory);
    const home = MEDIA_HOME[mediaType];

    // Keep the input in step with the URL (reload, back/forward, leaving search)
    useEffect(() => {
        setQuery(urlQuery);
    }, [urlQuery]);

    function handleKeyDown(e) {
        if (e.key === 'Enter') {
            const trimmedQuery = query.trim();
            navigate(trimmedQuery ? `${home}?s=${encodeURIComponent(trimmedQuery)}` : home);
            onSearch?.();
        }
    }

    return <label className={`${classes.searchContainer} ${fullWidth ? classes.fullWidth : ''}`}>
        <SearchIcon className={classes.icon} />
        <InputBase
            onKeyDown={handleKeyDown}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='Search movies & shows…'
            className={classes.input}
            inputProps={{ 'aria-label': 'Search movies and TV shows' }}
        />
    </label>
}
