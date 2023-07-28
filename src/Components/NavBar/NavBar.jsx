import React, { useContext, useEffect, useState } from 'react'
import useStyles from './NavBar.style.js'
import { AppBar, IconButton, Toolbar, useMediaQuery, Drawer, Button, Avatar } from '@mui/material';
import { Brightness7, Brightness4, AccountCircle, Menu } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles'
import { Link, useNavigate } from 'react-router-dom';
// import { Sidebar } from '..'
import { Search, Sidebar } from './../index.js'
import { createSessionId, fetchToken, moviesApi } from '../../utils/index.js';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, userSelector } from '../../features/auth.js';
import { ColorModeContext } from './../../utils/ToggoleColorMode';
import avater from './../../assests/avatar-profile.jpg'

export default function NavBar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const classes = useStyles();
    const isMobile = useMediaQuery('(max-width: 600px)');
    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);
    const dispatch = useDispatch();
    const { isAuthenticated, user } = useSelector(userSelector);

    // console.log(user);


    const token = localStorage.getItem('request_token');
    const sessionIdFromLocalStorage = localStorage.getItem('session_id');

    useEffect(()=>{
        const logInUser = async ()=> {
            if(token) {
                if(sessionIdFromLocalStorage) {
                    const { data: userData } = await moviesApi.get(`/account?session_id=${sessionIdFromLocalStorage}`)
                    dispatch(setUser(userData));
                }
                else {
                    const sessionId = await createSessionId();
                    const { data: userData } = await moviesApi.get(`/account?session_id=${sessionId}`)
                    dispatch(setUser(userData));
                }
            }

            
            // if(window.location.href.includes('approved')){
            //     window.location.href = '/';
            // }
        }

        logInUser();
        
    }, [token]);
    

    return <>
        <AppBar position='fixed'>
            <Toolbar className={classes.toolbar}>
                {isMobile && (
                    <IconButton
                        color='inherit'
                        edge='start'
                        style={{ outline: 'none' }}
                        onClick={()=>setMobileOpen((prevMobileOpen)=> !prevMobileOpen)}
                        className={classes.menuButton}
                    >
                        <Menu />
                    </IconButton>
                )}
                <IconButton color='inherit' sx={{ ml: 1 }} onClick={colorMode.toggoleColorMode} >
                    {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
                </IconButton>
                {!isMobile && <Search />}
                <div>
                    {!isAuthenticated ? (
                        <Button color='inherit' onClick={fetchToken}>
                            Login &nbsp; <AccountCircle />
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
                                src={user?.avater?.tmdb?.avatar_path? 
                                        `${process.env.REACT_APP_IMAGE_BASE_LINK}/${user?.avater?.tmdb?.avatar_path}` 
                                        :  avater}
                            />
                        </Button>
                    )}
                </div>
                {isMobile && <Search />}
            </Toolbar>
        </AppBar>
        <div>
            <nav className={classes.drawer}>
                {isMobile ? <>
                    <Drawer
                        variant='temporary'
                        anchor='right'
                        open={mobileOpen}
                        onClose={()=>setMobileOpen((prevMobileOpen)=> !prevMobileOpen)}
                        classes={{ paper: classes.drawerPaper }}
                        ModalProps={{ keepMounted: true }}
                    >
                        <Sidebar setMobileOpen={setMobileOpen} />
                    </Drawer>
                </> : <>
                    <Drawer classes={{ paper: classes.drawerPaper }} variant='permanent' open >
                        <Sidebar setMobileOpen={setMobileOpen} />
                    </Drawer>
                </>}
            </nav>
        </div>
    </>
}
