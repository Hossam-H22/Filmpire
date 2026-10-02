import { Brightness4, Brightness7 } from '@mui/icons-material';
import { Button, Chip, Divider } from '@mui/material';
import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory.js';
import { useGetGenresQuery } from '../../services/TMDB.js';
import { CATEGORIES } from './../../utils/constants.js';
import { ColorModeContext } from './../../utils/ToggoleColorMode';
import { Loader, Logo, Search } from './../index.js';
import useStyles from './Sidebar.style.js';

// Mobile navigation menu, opened from the NavBar menu button
export default function Sidebar({ setMobileOpen }) {
    const classes = useStyles();
    const colorMode = useContext(ColorModeContext);
    const { genreIdOrCategoryName } = useSelector((state) => state.curruntGenreOrCategory);
    const { data, isLoading } = useGetGenresQuery();
    const dispatch = useDispatch();
    const activeCategory = typeof genreIdOrCategoryName === 'string' ? (genreIdOrCategoryName || 'popular') : null;

    useEffect(() => {
        setMobileOpen(false);
    }, [genreIdOrCategoryName, setMobileOpen]);


    return <div className={classes.container}>
        <Logo onClick={() => setMobileOpen(false)} />
        <Search fullWidth onSearch={() => setMobileOpen(false)} />

        <div className={classes.section}>
            <span className={classes.label}>Categories</span>
            {CATEGORIES.map(({ label, value }) => (
                <Link
                    key={value}
                    to='/'
                    className={`${classes.category} ${activeCategory === value ? classes.categoryActive : ''}`}
                    onClick={() => dispatch(selectGenreOrCategory(value))}
                >
                    {label}
                </Link>
            ))}
        </div>

        <Divider />

        <div className={classes.section}>
            <span className={classes.label}>Genres</span>
            {isLoading ? <Loader /> : <div className={classes.chips}>
                {data?.genres?.map(({ name, id }) => (
                    <Chip
                        key={id}
                        label={name}
                        component={Link}
                        to='/'
                        clickable
                        color={id === genreIdOrCategoryName ? 'primary' : 'default'}
                        variant={id === genreIdOrCategoryName ? 'filled' : 'outlined'}
                        onClick={() => dispatch(selectGenreOrCategory(id))}
                    />
                ))}
            </div>}
        </div>

        <Divider />

        <Button
            variant='outlined'
            color='inherit'
            onClick={colorMode.toggoleColorMode}
            startIcon={colorMode.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
        >
            {colorMode.mode === 'dark' ? 'Light mode' : 'Dark mode'}
        </Button>
    </div>
}
