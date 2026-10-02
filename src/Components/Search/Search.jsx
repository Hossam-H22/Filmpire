import { Search as SearchIcon } from '@mui/icons-material'
import { InputBase } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import useStyles from './Search.style.js'


export default function Search({ fullWidth, onSearch }) {
    const classes = useStyles();
    const [searchParams] = useSearchParams();
    const urlQuery = searchParams.get('s') ?? '';
    const [query, setQuery] = useState(urlQuery);
    const navigate = useNavigate();

    // Keep the input in step with the URL (reload, back/forward, leaving search)
    useEffect(() => {
        setQuery(urlQuery);
    }, [urlQuery]);

    function handleKeyDown(e) {
        if (e.key === 'Enter') {
            const trimmedQuery = query.trim();
            navigate(trimmedQuery ? `/?s=${encodeURIComponent(trimmedQuery)}` : '/');
            onSearch?.();
        }
    }

    return <label className={`${classes.searchContainer} ${fullWidth ? classes.fullWidth : ''}`}>
        <SearchIcon className={classes.icon} />
        <InputBase
            onKeyDown={handleKeyDown}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='Search movies…'
            className={classes.input}
            inputProps={{ 'aria-label': 'Search movies' }}
        />
    </label>
}
