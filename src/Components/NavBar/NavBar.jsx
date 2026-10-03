import { AccountCircle, Brightness4, Brightness7, KeyboardArrowDown, Menu as MenuIcon } from '@mui/icons-material';
import { AppBar, Avatar, Button, Drawer, IconButton, Menu, MenuItem, Tooltip, useMediaQuery } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setUser, userSelector } from '../../features/auth.js';
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory.js';
import { useGetGenresQuery } from '../../services/TMDB.js';
import { createSessionId, fetchToken, moviesApi } from '../../utils/index.js';
import avater from './../../assests/avatar-profile.jpg';
import { CATEGORIES, MEDIA_HOME, TMDB_AVATAR_BASE_URL } from './../../utils/constants.js';
import { ColorModeContext } from './../../utils/ToggoleColorMode';
import { Logo, MediaTypeSwitch, PageContainer, Search, Sidebar } from './../index.js';
import useStyles from './NavBar.style.js';

export default function NavBar() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [genresAnchor, setGenresAnchor] = useState(null);
    const colorMode = useContext(ColorModeContext);
    const isMobile = useMediaQuery('(max-width: 900px)');
    const { isAuthenticated, user } = useSelector(userSelector);
    const { mediaType, genreIdOrCategoryName } = useSelector((state) => state.curruntGenreOrCategory);
    const { data: genres } = useGetGenresQuery(mediaType);
    const home = MEDIA_HOME[mediaType];
    const token = localStorage.getItem('request_token');
    const sessionIdFromLocalStorage = localStorage.getItem('session_id');
    const activeCategory = typeof genreIdOrCategoryName === 'string' ? (genreIdOrCategoryName || 'popular') : null;
    const activeGenre = genres?.genres?.find(({ id }) => id === genreIdOrCategoryName);

    useEffect(() => {
        const logInUser = async () => {
            if (token) {
                if (sessionIdFromLocalStorage) {
                    const { data: userData } = await moviesApi.get(`/account?session_id=${sessionIdFromLocalStorage}`)
                    dispatch(setUser(userData));
                }
                else {
                    const sessionId = await createSessionId();
                    const { data: userData } = await moviesApi.get(`/account?session_id=${sessionId}`)
                    dispatch(setUser(userData));
                }
            }
        }
        logInUser();
    }, [dispatch, sessionIdFromLocalStorage, token]);

    function selectGenre(id) {
        dispatch(selectGenreOrCategory(id));
        setGenresAnchor(null);
    }


    return <>
        <AppBar position='sticky' elevation={0} className={classes.appBar}>
            <PageContainer className={classes.toolbar}>
                {isMobile && (
                    <IconButton
                        className={classes.iconButton}
                        aria-label='Open menu'
                        onClick={() => setMobileOpen(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                )}

                <Logo />

                {!isMobile && <MediaTypeSwitch />}

                {!isMobile && (
                    <nav className={classes.links}>
                        {CATEGORIES[mediaType].map(({ label, value }) => (
                            <Link
                                key={value}
                                to={home}
                                className={`${classes.link} ${activeCategory === value ? classes.linkActive : ''}`}
                                onClick={() => dispatch(selectGenreOrCategory(value))}
                            >
                                {label}
                            </Link>
                        ))}
                        <button
                            type='button'
                            className={`${classes.link} ${activeGenre ? classes.linkActive : ''}`}
                            aria-haspopup='true'
                            aria-expanded={Boolean(genresAnchor)}
                            onClick={(e) => setGenresAnchor(e.currentTarget)}
                        >
                            {activeGenre?.name ?? 'Genres'} <KeyboardArrowDown fontSize='small' />
                        </button>
                        <Menu
                            anchorEl={genresAnchor}
                            open={Boolean(genresAnchor)}
                            onClose={() => setGenresAnchor(null)}
                            classes={{ paper: classes.genresMenu }}
                        >
                            {genres?.genres?.map(({ id, name }) => (
                                <MenuItem
                                    key={id}
                                    component={Link}
                                    to={home}
                                    selected={id === genreIdOrCategoryName}
                                    onClick={() => selectGenre(id)}
                                >
                                    {name}
                                </MenuItem>
                            ))}
                        </Menu>
                    </nav>
                )}

                <div className={classes.right}>
                    {!isMobile && <Search />}
                    <Tooltip title={colorMode.mode === 'dark' ? 'Light mode' : 'Dark mode'}>
                        <IconButton className={classes.iconButton} onClick={colorMode.toggoleColorMode} aria-label='Toggle light and dark theme'>
                            {colorMode.mode === 'dark' ? <Brightness7 fontSize='small' /> : <Brightness4 fontSize='small' />}
                        </IconButton>
                    </Tooltip>
                    {!isAuthenticated ? (
                        <Button variant='contained' size='small' onClick={fetchToken} endIcon={<AccountCircle />}>
                            Login
                        </Button>
                    ) : (
                        <Tooltip title='My Library'>
                            <IconButton component={Link} to={`/profile/${user.id}`} className={classes.avatarButton} aria-label='My Library'>
                                <Avatar
                                    className={classes.avatar}
                                    alt='Profile'
                                    src={user?.avatar?.tmdb?.avatar_path ?
                                        `${TMDB_AVATAR_BASE_URL}/${user?.avatar?.tmdb?.avatar_path}`
                                        : avater}
                                />
                            </IconButton>
                        </Tooltip>
                    )}
                </div>
            </PageContainer>
        </AppBar>
        <Drawer
            variant='temporary'
            anchor='left'
            open={isMobile && mobileOpen}
            onClose={() => setMobileOpen(false)}
            classes={{ paper: classes.drawerPaper }}
            ModalProps={{ keepMounted: true }}
        >
            <Sidebar setMobileOpen={setMobileOpen} />
        </Drawer>
    </>
}
