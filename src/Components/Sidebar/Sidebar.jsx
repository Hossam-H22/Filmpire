import React from 'react'
import useStyles from './Sidebar.style.js'
import { Divider, List, ListItem, ListItemIcon, ListSubheader, Box, CircularProgress, ListItemText, Typography } from '@mui/material'
import { useTheme } from '@mui/styles';
import { Link } from 'react-router-dom';
import darkLogo from './../../assests/Dark_logo.png'
import lightLogo from './../../assests/Light_logo.png'
import { useGetGenresQuery } from '../../services/TMDB.js';
import { Loader } from './../index.js'
import genreIcons from './../../assests/genres/index.js'
import { useDispatch, useSelector } from 'react-redux';
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory.js';




const categories = [
    { label: 'Popular', value: 'popular' },
    { label: 'Top Rated', value: 'top_rated' },
    { label: 'Upcoming', value: 'upcoming' },
];



export default function Sidebar({ setMobileOpen }) {
    const classes = useStyles();
    const theme = useTheme();

    const { data, isFetching } = useGetGenresQuery();
    const { genreIdOrCategoryName } = useSelector((state)=> state.curruntGenreOrCategory);
    const dispatch = useDispatch();


    return <>
        <Link to={`/`} className={classes.imageLink}>
            <img
                className={classes.image}
                src={theme.palette.mode === 'light' ? lightLogo : darkLogo}
                alt="Filmpire logo" />
        </Link>
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
            {isFetching? <Loader /> : data?.genres?.map(({ name, id }) => (
                <Link key={id} className={classes.links} to={`/`} >
                    <ListItem onClick={() => dispatch(selectGenreOrCategory(id)) } button>
                        <ListItemIcon>
                            <img src={genreIcons[name.toLowerCase()]} alt="icon" className={classes.genereImages} height={30} />
                        </ListItemIcon>
                        <ListItemText primary={name} />
                    </ListItem>
                </Link>
            ))}
        </List>

    </>
}
