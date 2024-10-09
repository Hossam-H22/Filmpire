import React, { useEffect, useState } from 'react'
import useStyles from './Profile.style.js'
import { useSelector } from 'react-redux';
import { userSelector } from '../../features/auth.js';
import { Box, Button, Typography } from '@mui/material';
import { ExitToApp } from '@mui/icons-material';
import { useGetListQuery } from '../../services/TMDB.js';
import { Loader, RatedCards } from './../index.js'
import { Helmet } from 'react-helmet';


export default function Profile() {
    const classes = useStyles();
    
    const { user } = useSelector(userSelector);
    const sessionId = localStorage.getItem('session_id');
    const [favoritePage, setFavoritePage] = useState(1);
    const [watchlistPage, setWatchlistPage] = useState(1);
    const { data: favoriteMovies, 
        isFetching: isFetchingFavoriteMovies, 
        refetch: refetchFavorites } = useGetListQuery({listName: 'favorite/movies', accountId: user.id, sessionId: sessionId, page: favoritePage});

    const { data: watchlistMovies, 
        isFetching: isFetchingWatchlistMovies, 
        refetch: refetchWatchlistes } = useGetListQuery({listName: 'watchlist/movies', accountId: user.id, sessionId: sessionId, page: watchlistPage});

    console.log(watchlistMovies);


    useEffect(()=>{
        refetchFavorites();
        refetchWatchlistes();
    }, []);


    
    function logout() {
        localStorage.clear();
        window.location.href = '/';
    }

    if(isFetchingFavoriteMovies || isFetchingWatchlistMovies) return <Loader size='8rem' />

    return <>
        <Helmet>
            <title>Profile</title>
        </Helmet>
        <Box>
            <Box display='flex' justifyContent='space-between' >
                <Typography variant='h4' gutterBottom>My Profie</Typography>
                <Button color='inherit' onClick={logout}>
                    Logout &nbsp; <ExitToApp />
                </Button>
            </Box>

            {!favoriteMovies?.total_results && !watchlistMovies?.total_results ? 
                <Typography variant='h5' >Add favorite or watchlist some movies to see them here!</Typography>
                : 
                <Box>
                    {favoriteMovies?.total_results? <RatedCards 
                        title='Favorite Movies' 
                        data={favoriteMovies} 
                        page={favoritePage} 
                        setPage={setFavoritePage}
                    /> : ''}
                    {watchlistMovies?.total_results? <RatedCards 
                        title='Watchlist' 
                        data={watchlistMovies}
                        page={watchlistPage} 
                        setPage={setWatchlistPage}
                    /> : ''}
                </Box> 
            }
        </Box>
    </>
}
