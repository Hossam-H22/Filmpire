import React, { useContext, useEffect, useState } from 'react'
import useStyles from './NavBar.style.js'
import { AppBar, IconButton, Toolbar, useMediaQuery, Drawer, Button, Avatar } from '@mui/material';
import { AccountCircle, Menu } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles'
import { Link } from 'react-router-dom';
import { Search, Sidebar } from './../index.js'
import { createSessionId, fetchToken, moviesApi } from '../../utils/index.js';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, userSelector } from '../../features/auth.js';
import { ColorModeContext } from './../../utils/ToggoleColorMode';
import avater from './../../assests/avatar-profile.jpg'

export default function NavBar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const classes = useStyles();
    const isMobile = useMediaQuery('(max-width: 900px)');
    const isMobileSmall = useMediaQuery('(max-width: 600px)');
    const colorMode = useContext(ColorModeContext);
    const theme = useTheme();
    const dispatch = useDispatch();
    const { isAuthenticated, user } = useSelector(userSelector);


    const token = localStorage.getItem('request_token');
    const sessionIdFromLocalStorage = localStorage.getItem('session_id');

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


    return <>
        <AppBar position='fixed'>
            <Toolbar className={classes.toolbar}>
                <span>{isMobile && (<IconButton
                    color='inherit'
                    edge='start'
                    style={{ outline: 'none' }}
                    onClick={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
                    className={classes.menuButton}
                >
                    <Menu />
                </IconButton>)}
                    <div></div>
                </span>

                <Search />
                {!isAuthenticated ? (
                    <Button color='inherit' onClick={fetchToken} >
                        Login &nbsp; {!isMobileSmall && <AccountCircle />}
                    </Button>
                ) : (
                    <Button
                        color='inherit'
                        component={Link}
                        to={`/profile/${user.id}`}
                        className={classes.linkButtom}
                        onClick={() => { }}
                    >
                        {!isMobile && <>My Movies &nbsp;</>}
                        <Avatar
                            style={{ width: 30, height: 30 }}
                            alt='Profile'
                            src={user?.avater?.tmdb?.avatar_path ?
                                `https://www.themoviedb.org/t/p/w64_and_h64_face/${user?.avater?.tmdb?.avatar_path}`
                                : avater}
                        />
                    </Button>
                )}
            </Toolbar>
        </AppBar>
        <div>
            <nav className={classes.drawer}>
                <Drawer
                    variant={isMobile ? 'temporary' : 'permanent'}
                    anchor='left'
                    open={mobileOpen}
                    onClose={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
                    classes={{ paper: classes.drawerPaper }}
                    ModalProps={{ keepMounted: true }}
                >
                    <Sidebar setMobileOpen={setMobileOpen} changeTheme={colorMode.toggoleColorMode} />
                </Drawer>
            </nav>
        </div>
    </>
}
