import { Brightness4, Brightness7 } from '@mui/icons-material';
import { Divider, IconButton, List, ListItem, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import { useTheme } from '@mui/styles';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory.js';
import { useGetGenresQuery } from '../../services/TMDB.js';
import darkLogo from './../../assests/Dark_logo.png';
import genreIcons from './../../assests/genres/index.js';
import lightLogo from './../../assests/Light_logo.png';
import { Footer, Loader } from './../index.js';
import useStyles from './Sidebar.style.js';

const categories = [
    { label: 'Popular', value: 'popular' },
    { label: 'Top Rated', value: 'top_rated' },
    { label: 'Upcoming', value: 'upcoming' },
];


export default function Sidebar({ setMobileOpen, changeTheme }) {
    const classes = useStyles();
    const theme = useTheme();
    const { genreIdOrCategoryName } = useSelector((state) => state.curruntGenreOrCategory);
    const { data, isLoading } = useGetGenresQuery();
    const dispatch = useDispatch();

    useEffect(() => {
        setMobileOpen(false);
    }, [genreIdOrCategoryName, setMobileOpen]);


    return <>
        <Link to={`/`} className={classes.imageLink}>
            <img
                className={classes.image}
                src={theme.palette.mode === 'light' ? lightLogo : darkLogo}
                alt="Filmpire logo" />
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
            <IconButton color='inherit' onClick={changeTheme} >
                {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 sx={{ color: '#1976d2' }} />}
            </IconButton>
        </div>
        <Divider />
        <List>
            <ListSubheader>
                Categories
            </ListSubheader>
            {categories.map(({ label, value }) => (
                <Link key={value} className={classes.links} to={`/`} >
                    <ListItem onClick={() => dispatch(selectGenreOrCategory(value))} button>
                        <ListItemIcon>
                            <img src={genreIcons[label.toLowerCase()]} alt="icon" className={classes.genereImages} height={30} />
                        </ListItemIcon>
                        <ListItemText primary={label} />
                    </ListItem>
                </Link>
            ))}
        </List>
        <Divider />
        <List>
            <ListSubheader>
                Genres
            </ListSubheader>
            {isLoading ? <Loader /> : data?.genres?.map(({ name, id }) => (
                <Link key={id} className={classes.links} to={`/`} >
                    <ListItem onClick={() => dispatch(selectGenreOrCategory(id))} button>
                        <ListItemIcon>
                            <img src={genreIcons[name.toLowerCase()]} alt="icon" className={classes.genereImages} height={30} />
                        </ListItemIcon>
                        <ListItemText primary={name} />
                    </ListItem>
                </Link>
            ))}
        </List>
        <Divider />
        <Footer />
    </>
}
