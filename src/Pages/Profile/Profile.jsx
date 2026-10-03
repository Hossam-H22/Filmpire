import { ExitToApp } from '@mui/icons-material';
import { Avatar, Button, Chip, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Loader, MovieList, PageContainer, Pagination, Tabs } from './../../Components/index.js';
import avater from './../../assests/avatar-profile.jpg';
import { userSelector } from './../../features/auth.js';
import { useGetListQuery } from './../../services/TMDB.js';
import { TMDB_AVATAR_BASE_URL } from './../../utils/constants.js';
import useStyles from './Profile.style.js';


const LIST_TYPES = [
    { label: 'Movies', value: 'movies' },
    { label: 'TV Shows', value: 'tv' },
];

export default function Profile() {
    const classes = useStyles();
    const { user } = useSelector(userSelector);
    const sessionId = localStorage.getItem('session_id');
    const [activeTab, setActiveTab] = useState('favorite');
    const [listType, setListType] = useState('movies');
    // Page of each list, keyed by TMDB list name such as 'favorite/tv'
    const [pages, setPages] = useState({});
    const listQuery = (listName) => ({ listName, accountId: user.id, sessionId: sessionId, page: pages[listName] ?? 1 });
    const options = { refetchOnMountOrArgChange: true };
    const lists = {
        'favorite/movies': useGetListQuery(listQuery('favorite/movies'), options),
        'favorite/tv': useGetListQuery(listQuery('favorite/tv'), options),
        'watchlist/movies': useGetListQuery(listQuery('watchlist/movies'), options),
        'watchlist/tv': useGetListQuery(listQuery('watchlist/tv'), options),
    };

    function logout() {
        localStorage.clear();
        window.location.href = '/';
    }

    if (Object.values(lists).some((list) => list.isLoading)) return <Loader size='8rem' />

    const countOf = (listName) => lists[listName].data?.total_results ?? 0;
    const favoriteCount = countOf('favorite/movies') + countOf('favorite/tv');
    const watchlistCount = countOf('watchlist/movies') + countOf('watchlist/tv');
    const activeListName = `${activeTab}/${listType}`;
    const list = lists[activeListName].data;
    const page = pages[activeListName] ?? 1;
    const noun = listType === 'tv' ? 'show' : 'movie';
    const empty = activeTab === 'favorite'
        ? `Tap Favorite on any ${noun} page to save it here.`
        : `Tap Watchlist on any ${noun} page to plan what to watch next.`;

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
                    <div className={classes.eyebrow}>My Library</div>
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
                <div className={classes.listTypes}>
                    {LIST_TYPES.map(({ label, value }) => (
                        <Chip
                            key={value}
                            label={`${label} · ${countOf(`${activeTab}/${value}`)}`}
                            clickable
                            color={value === listType ? 'primary' : 'default'}
                            variant={value === listType ? 'filled' : 'outlined'}
                            onClick={() => setListType(value)}
                        />
                    ))}
                </div>
            </div>
            {list?.total_results ? <>
                <MovieList movies={list} mediaType={listType === 'tv' ? 'tv' : 'movie'} />
                <Pagination
                    curruntPage={page}
                    setPage={(nextPage) => setPages((prev) => ({ ...prev, [activeListName]: nextPage }))}
                    totalPages={list?.total_pages}
                />
            </> : (
                <div className={classes.empty}>
                    <div className={classes.reel} />
                    <Typography variant='h5' className={classes.emptyTitle}>Nothing here yet</Typography>
                    <Typography color='text.secondary'>{empty}</Typography>
                    <Button variant='contained' component={Link} to={listType === 'tv' ? '/tv' : '/'}>Browse popular {noun}s</Button>
                </div>
            )}
        </PageContainer>
    </>
}
