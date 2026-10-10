import { AccountCircle, Brightness4, Brightness7, Close, ExitToApp, LibraryBooks, Menu as MenuIcon, Search as SearchIcon } from '@mui/icons-material';
import { AppBar, Avatar, Button, Drawer, IconButton, ListItemIcon, Menu, MenuItem, Tooltip, useMediaQuery } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { clearUser, setUser, startLogin, userSelector } from '../../features/auth.js';
import { clearAuth, fetchAccount, fetchToken, getStoredSessionId, logout } from '../../utils/index.js';
import avater from './../../assests/avatar-profile.jpg';
import { TMDB_AVATAR_BASE_URL } from './../../utils/constants.js';
import { ColorModeContext } from './../../utils/ToggoleColorMode';
import { Logo, MediaTypeSwitch, PageContainer, Search, Sidebar } from './../index.js';
import useStyles from './NavBar.style.js';

// Categories and genres are picked on the home page itself (GenreFilter), or from the Sidebar on mobile
export default function NavBar() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { key } = useLocation();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
    const [accountAnchor, setAccountAnchor] = useState(null);
    const colorMode = useContext(ColorModeContext);
    const isMobile = useMediaQuery('(max-width: 900px)');
    const { isAuthenticated, isLoading, user } = useSelector(userSelector);

    // Restore the saved session on page load. New sessions are created on the /approved page
    useEffect(() => {
        const sessionId = getStoredSessionId();
        if (!sessionId) return;

        const restoreSession = async () => {
            dispatch(startLogin());
            try {
                const user = await fetchAccount(sessionId);
                dispatch(setUser({ user, sessionId }));
            } catch (error) {
                // Expired or revoked session: forget it so the user can log in again
                if (error?.response?.status === 401) clearAuth();
                dispatch(clearUser());
            }
        }
        restoreSession();
    }, [dispatch]);

    // Any navigation closes the open menus
    useEffect(() => {
        setMobileOpen(false);
        setMobileSearchOpen(false);
        setAccountAnchor(null);
    }, [key]);

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

                <div className={classes.right}>
                    {isMobile ? (
                        <IconButton
                            className={classes.iconButton}
                            aria-label={mobileSearchOpen ? 'Close search' : 'Search'}
                            aria-expanded={mobileSearchOpen}
                            onClick={() => setMobileSearchOpen((open) => !open)}
                        >
                            {mobileSearchOpen ? <Close fontSize='small' /> : <SearchIcon fontSize='small' />}
                        </IconButton>
                    ) : <Search />}
                    <Tooltip title={colorMode.mode === 'dark' ? 'Light mode' : 'Dark mode'}>
                        <IconButton className={classes.iconButton} onClick={colorMode.toggoleColorMode} aria-label='Toggle light and dark theme'>
                            {colorMode.mode === 'dark' ? <Brightness7 fontSize='small' /> : <Brightness4 fontSize='small' />}
                        </IconButton>
                    </Tooltip>
                    {isLoading ? null : !isAuthenticated ? (
                        <Button variant='contained' size='small' onClick={fetchToken} endIcon={<AccountCircle />}>
                            Login
                        </Button>
                    ) : <>
                        <Tooltip title='Account'>
                            <IconButton
                                className={classes.avatarButton}
                                aria-label='Account menu'
                                aria-haspopup='true'
                                aria-expanded={Boolean(accountAnchor)}
                                onClick={(e) => setAccountAnchor(e.currentTarget)}
                            >
                                <Avatar
                                    className={classes.avatar}
                                    alt='Profile'
                                    src={user?.avatar?.tmdb?.avatar_path ?
                                        `${TMDB_AVATAR_BASE_URL}/${user?.avatar?.tmdb?.avatar_path}`
                                        : avater}
                                />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            anchorEl={accountAnchor}
                            open={Boolean(accountAnchor)}
                            onClose={() => setAccountAnchor(null)}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                            classes={{ paper: classes.menu }}
                        >
                            <MenuItem component={Link} to={`/profile/${user.id}`}>
                                <ListItemIcon><LibraryBooks fontSize='small' /></ListItemIcon>
                                My Library
                            </MenuItem>
                            <MenuItem onClick={logout}>
                                <ListItemIcon><ExitToApp fontSize='small' /></ListItemIcon>
                                Log out
                            </MenuItem>
                        </Menu>
                    </>}
                </div>
            </PageContainer>
            {isMobile && mobileSearchOpen && <PageContainer className={classes.mobileSearch}>
                <Search fullWidth autoFocus onSearch={() => setMobileSearchOpen(false)} />
            </PageContainer>}
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
