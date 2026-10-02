import { Chip } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory.js';
import { useGetGenresQuery } from '../../services/TMDB.js';
import { CATEGORIES } from './../../utils/constants.js';
import { Tabs } from './../index.js';
import useStyles from './GenreFilter.style.js';

// Category tabs plus a horizontally scrolling row of genre chips
export default function GenreFilter() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { genreIdOrCategoryName } = useSelector((state) => state.curruntGenreOrCategory);
    const { data } = useGetGenresQuery();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const isSearching = Boolean(searchParams.get('s'));
    const activeCategory = !isSearching && typeof genreIdOrCategoryName === 'string' ? (genreIdOrCategoryName || 'popular') : null;
    const activeGenre = isSearching ? null : genreIdOrCategoryName;

    // Picking a category or genre leaves search mode
    function select(value) {
        dispatch(selectGenreOrCategory(value));
        navigate('/');
    }

    return <div className={classes.container}>
        <Tabs
            label='Categories'
            tabs={CATEGORIES}
            value={activeCategory}
            onChange={select}
        />
        <div className={classes.chips}>
            {data?.genres?.map(({ id, name }) => (
                <Chip
                    key={id}
                    label={name}
                    clickable
                    color={id === activeGenre ? 'primary' : 'default'}
                    variant={id === activeGenre ? 'filled' : 'outlined'}
                    onClick={() => select(id)}
                    className={classes.chip}
                />
            ))}
        </div>
    </div>
}
