import React, { useState } from 'react'
import useStyles from './Search.style.js'
import { TextField, InputAdornment } from '@mui/material'
import { Search as SearchIcon } from '@mui/icons-material'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { searchMovie } from '../../features/currentGenreOrCategory.js'


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
