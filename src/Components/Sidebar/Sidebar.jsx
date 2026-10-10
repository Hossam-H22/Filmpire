import { Brightness4, Brightness7 } from '@mui/icons-material';
import { Button, Chip, Divider } from '@mui/material';
import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { useGetGenresQuery } from '../../services/TMDB.js';
import { browseUrl, useBrowseParams } from './../../utils/browse.js';
import { CATEGORIES, MEDIA_HOME } from './../../utils/constants.js';
import { ColorModeContext } from './../../utils/ToggoleColorMode';
import { Loader, Logo, MediaTypeSwitch, Search } from './../index.js';
import useStyles from './Sidebar.style.js';

// Mobile navigation menu, opened from the NavBar menu button. The NavBar closes it on every navigation
export default function Sidebar({ setMobileOpen }) {
    const classes = useStyles();
    const colorMode = useContext(ColorModeContext);
    const { pathname } = useLocation();
    const { mediaType } = useSelector((state) => state.curruntGenreOrCategory);
    const { data, isLoading } = useGetGenresQuery(mediaType);
    const { genre, category } = useBrowseParams(mediaType);
    // Only the home page has an active category or genre
    const isHome = pathname === MEDIA_HOME[mediaType];
    const activeCategory = isHome ? category : null;
    const activeGenre = isHome ? genre : null;

    return <div className={classes.container}>
        <Logo onClick={() => setMobileOpen(false)} />
        <MediaTypeSwitch fullWidth onChange={() => setMobileOpen(false)} />
        <Search fullWidth onSearch={() => setMobileOpen(false)} />

        <nav className={classes.section} aria-label='Categories'>
            <span className={classes.label}>Categories</span>
            {CATEGORIES[mediaType].map(({ label, value }) => (
                <Link
                    key={value}
                    to={browseUrl(mediaType, { category: value })}
                    aria-current={activeCategory === value ? 'page' : undefined}
                    className={`${classes.category} ${activeCategory === value ? classes.categoryActive : ''}`}
                    onClick={() => setMobileOpen(false)}
                >
                    {label}
                </Link>
            ))}
        </nav>

        <Divider />

        <div className={classes.section}>
            <span className={classes.label}>Genres</span>
            {isLoading ? <Loader /> : <div className={classes.chips}>
                {data?.genres?.map(({ name, id }) => (
                    <Chip
                        key={id}
                        label={name}
                        component={Link}
                        to={browseUrl(mediaType, { genre: id })}
                        clickable
                        color={id === activeGenre ? 'primary' : 'default'}
                        variant={id === activeGenre ? 'filled' : 'outlined'}
                        onClick={() => setMobileOpen(false)}
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
