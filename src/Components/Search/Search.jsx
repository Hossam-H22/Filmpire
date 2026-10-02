import { Search as SearchIcon } from '@mui/icons-material'
import { InputBase } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { searchMovie } from '../../features/currentGenreOrCategory.js'
import useStyles from './Search.style.js'


export default function Search({ fullWidth, onSearch }) {
    const classes = useStyles();

    const [query, setQuery] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleKeyDown(e) {
        if (e.key === 'Enter') {
            dispatch(searchMovie(query));
            navigate('/');
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
