import { Search as SearchIcon } from '@mui/icons-material'
import { InputAdornment, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { searchMovie } from '../../features/currentGenreOrCategory.js'
import useStyles from './Search.style.js'


export default function Search() {
    const classes = useStyles();

    const [query, setQuery] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleKeyPress(e) {
        if (e.key === 'Enter') {
            dispatch(searchMovie(query));
            navigate('/');
        }
    }

    // if(location.pathname !== '/') return null

    return <div className={classes.searchContainer}>
        <TextField
            onKeyPress={handleKeyPress}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            variant='standard'
            InputProps={{
                className: classes.input,
                startAdornment: (
                    <InputAdornment position='start' >
                        <SearchIcon />
                    </InputAdornment>
                ),
            }}
        />
    </div>
}
