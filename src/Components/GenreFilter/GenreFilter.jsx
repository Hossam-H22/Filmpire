import { Chip } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
    const activeCategory = typeof genreIdOrCategoryName === 'string' ? (genreIdOrCategoryName || 'popular') : null;

    return <div className={classes.container}>
        <Tabs
            label='Categories'
            tabs={CATEGORIES}
            value={activeCategory}
            onChange={(value) => dispatch(selectGenreOrCategory(value))}
        />
        <div className={classes.chips}>
            {data?.genres?.map(({ id, name }) => (
                <Chip
                    key={id}
                    label={name}
                    clickable
                    color={id === genreIdOrCategoryName ? 'primary' : 'default'}
                    variant={id === genreIdOrCategoryName ? 'filled' : 'outlined'}
                    onClick={() => dispatch(selectGenreOrCategory(id))}
                    className={classes.chip}
                />
            ))}
        </div>
    </div>
}
