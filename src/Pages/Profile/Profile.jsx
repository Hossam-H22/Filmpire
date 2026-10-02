import { ExitToApp } from '@mui/icons-material';
import { Avatar, Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Loader, MovieList, PageContainer, Pagination, Tabs } from './../../Components/index.js';
import avater from './../../assests/avatar-profile.jpg';
import { userSelector } from './../../features/auth.js';
import { useGetListQuery } from './../../services/TMDB.js';
import { TMDB_AVATAR_BASE_URL } from './../../utils/constants.js';
import useStyles from './Profile.style.js';


export default function Profile() {
    const classes = useStyles();
    const { user } = useSelector(userSelector);
    const sessionId = localStorage.getItem('session_id');
    const [activeTab, setActiveTab] = useState('favorite');
    const [favoritePage, setFavoritePage] = useState(1);
    const [watchlistPage, setWatchlistPage] = useState(1);
    const { data: favoriteMovies,
        isLoading: isLoadingFavoriteMovies,
        refetch: refetchFavorites } = useGetListQuery({ listName: 'favorite/movies', accountId: user.id, sessionId: sessionId, page: favoritePage });

    const { data: watchlistMovies,
        isLoading: isLoadingWatchlistMovies,
        refetch: refetchWatchlistes } = useGetListQuery({ listName: 'watchlist/movies', accountId: user.id, sessionId: sessionId, page: watchlistPage });

    useEffect(() => {
        refetchFavorites();
        refetchWatchlistes();
    }, []);


    function logout() {
        localStorage.clear();
        window.location.href = '/';
    }

    if (isLoadingFavoriteMovies || isLoadingWatchlistMovies) return <Loader size='8rem' />

    const favoriteCount = favoriteMovies?.total_results ?? 0;
    const watchlistCount = watchlistMovies?.total_results ?? 0;
    const lists = {
        favorite: { data: favoriteMovies, page: favoritePage, setPage: setFavoritePage, empty: 'Tap Favorite on any movie page to save it here.' },
        watchlist: { data: watchlistMovies, page: watchlistPage, setPage: setWatchlistPage, empty: 'Tap Watchlist on any movie page to plan what to watch next.' },
    };
    const list = lists[activeTab];

    return <>
        <Helmet>
            <title>Profile</title>
        </Helmet>
        <section className={classes.header}>
            <PageContainer className={classes.headerContent}>
                <Avatar
                    className={classes.avatar}
                    alt='Profile'
                    src={user?.avatar?.tmdb?.avatar_path ? `${TMDB_AVATAR_BASE_URL}/${user?.avatar?.tmdb?.avatar_path}` : avater}
                />
                <div>
                    <div className={classes.eyebrow}>My Movies</div>
                    <h1 className={classes.name}>{user?.name || user?.username}</h1>
                </div>
                <div className={classes.stats}>
                    <div><b>{favoriteCount}</b><span>Favorites</span></div>
                    <div><b>{watchlistCount}</b><span>Watchlist</span></div>
                    <Button color='inherit' variant='outlined' onClick={logout} endIcon={<ExitToApp />}>
                        Log out
                    </Button>
                </div>
            </PageContainer>
        </section>

        <PageContainer>
            <div className={classes.tabs}>
                <Tabs
                    label='My lists'
                    value={activeTab}
                    onChange={setActiveTab}
                    tabs={[
                        { label: `Favorites · ${favoriteCount}`, value: 'favorite' },
                        { label: `Watchlist · ${watchlistCount}`, value: 'watchlist' },
                    ]}
                />
            </div>
            {list.data?.total_results ? <>
                <MovieList movies={list.data} />
                <Pagination curruntPage={list.page} setPage={list.setPage} totalPages={list.data?.total_pages} />
            </> : (
                <div className={classes.empty}>
                    <div className={classes.reel} />
                    <Typography variant='h5' className={classes.emptyTitle}>Nothing here yet</Typography>
                    <Typography color='text.secondary'>{list.empty}</Typography>
                    <Button variant='contained' component={Link} to='/'>Browse popular movies</Button>
                </div>
            )}
        </PageContainer>
    </>
}
