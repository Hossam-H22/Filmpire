import React, { useEffect, useState } from 'react'
import useStyles from './MovieInformation.style.js'
import { Modal, Typography, Button, ButtonGroup, Grid, Box, Rating } from '@mui/material';
import { Movie as MovieIcon, Theaters, Language, PlusOne, Favorite, FavoriteBorderOutlined, Remove, ArrowBack, Close, DesignServicesOutlined, Dns, } from '@mui/icons-material'
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useGetListQuery, useGetMovieQuery, useGetRecommendationsQuery } from '../../services/TMDB.js';
import { Loader, MovieList, NotFound } from './../index.js'
import moviePoster from './../../assests/movie-poster.png'
import genreIcons from './../../assests/genres/index.js'
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory.js';
import { userSelector } from '../../features/auth.js';

export default function MovieInformation() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { user } = useSelector(userSelector);
    const [open, setOpen] = useState(false);
    const [playMovie, setPlayMovie] = useState(false);
    const [movieServer, setMovieServer] = useState(1);
    const [isMovieFavorited, setIsMovieFavorited] = useState(false);
    const [isMovieWatchlisted, setIsMovieWatchlisted] = useState(false);
    const { id } = useParams();

    const baseUrl = process.env.REACT_APP_API_BASE_URL;
    const tmdbApiKey = process.env.REACT_APP_TMDB_KEY;
    const sessionId = localStorage.getItem('session_id');
    const { data, isFetching, error } = useGetMovieQuery(id);
    const { data: favoriteMovies } = useGetListQuery({ listName: 'favorite/movies', accountId: user.id, sessionId: sessionId, page: 1 });
    const { data: watchlistMovies } = useGetListQuery({ listName: 'watchlist/movies', accountId: user.id, sessionId: sessionId, page: 1 });
    const { data: recommendations, isFetching: isRecommendationsFetching } = useGetRecommendationsQuery({ list: 'recommendations', movie_id: id });

    function formatDate(inputDate) {
        const months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
        ];
        const [year, month, day] = inputDate.split("-").map(Number);
        const formattedDate = `${months[month - 1]} ${day} ${year}`;
        return formattedDate;
    }

    useEffect(() => {
        setIsMovieFavorited(!!favoriteMovies?.results?.find((movie) => movie?.id === data?.id));
    }, [favoriteMovies, data]);

    useEffect(() => {
        setIsMovieWatchlisted(!!watchlistMovies?.results?.find((movie) => movie?.id === data?.id));
    }, [watchlistMovies, data]);


    async function addToFavorites() {
        await axios.post(`${baseUrl}/account/${user?.id}/favorite?api_key=${tmdbApiKey}&session_id=${sessionId}`, {
            media_type: 'movie',
            media_id: id,
            favorite: !isMovieFavorited,
        }).catch((error) => console.log(error));
        setIsMovieFavorited((prev) => !prev);
    }

    async function addToWatchlist() {
        await axios.post(`${baseUrl}/account/${user?.id}/watchlist?api_key=${tmdbApiKey}&session_id=${sessionId}`, {
            media_type: 'movie',
            media_id: id,
            watchlist: !isMovieWatchlisted,
        }).catch((error) => console.log(error));
        setIsMovieWatchlisted((prev) => !prev);
    }

    console.log(data);


    if (isFetching) return <Loader size='8rem' />

    if (error) return <NotFound message='Something has gone wrong - Go back' path='/' />

    return <>
        <Grid container className={classes.containerSpaceAround} >
            <Grid item sm={12} lg={4} className={classes.posterContainer}> {/* Image Grid */}
                <img
                    className={classes.poster}
                    src={data?.poster_path ? `${process.env.REACT_APP_IMAGE_BASE_LINK}${data?.poster_path}` : moviePoster}
                    alt={data?.title}
                />
            </Grid>
            <Grid item container direction='column' lg={7} > {/* Film Data Grid */}
                <Typography variant='h3' align='center' gutterBottom>
                    {data?.title} ({data?.release_date?.split('-')[0]})
                </Typography>
                <Typography variant='h5' align='center' gutterBottom>
                    {data?.tagline}
                </Typography>
                <Grid item className={classes.containerSpaceAround}> {/* Rating & Languages Grid */}
                    <Box display='flex' align='center' >
                        <Rating readOnly value={data?.vote_average / 2} precision={0.1} />
                        <Typography variant='subtitle1' gutterBottom style={{ marginLeft: '10px' }}>{data?.vote_average} / 10</Typography>
                    </Box>
                    <Typography variant='h6' align='center' gutterBottom>
                        {data?.runtime}min / {formatDate(data?.release_date)} {data?.spoken_languages?.length > 0 ? ` / ${data?.spoken_languages[0]?.name}` : ''}
                    </Typography>
                </Grid>
                <Grid item className={classes.genresContainer}> {/* Genres Grid */}
                    {data?.genres?.map((genre, index) => (
                        <Link
                            key={index}
                            className={classes.links}
                            to={`/`}
                            onClick={() => dispatch(selectGenreOrCategory(genre?.id))}
                        >
                            <img src={genreIcons[genre?.name?.toLowerCase()]} alt="icon" className={classes.genereImage} height={30} />
                            <Typography color='textPrimary' variant='subtitle1'>{genre?.name}</Typography>
                        </Link>
                    ))}
                </Grid>
                <Typography variant='h5' gutterBottom style={{ marginTop: '10px' }}> Overview </Typography>
                <Typography style={{ marginBottom: '2rem' }}> {data?.overview} </Typography>
                <Typography variant='h5' gutterBottom> Top Cast </Typography>
                <Grid item container spacing={2}> {/* Cast Data Grid */}
                    {data?.credits?.cast?.map((character, index) => (character?.profile_path && (
                        <Grid
                            key={index}
                            item
                            xs={4} md={2}
                            component={Link}
                            to={`/actor/${character?.id}`}
                            style={{ textDecoration: 'none' }}
                        >
                            <img
                                className={classes.castImage}
                                src={`${process.env.REACT_APP_IMAGE_BASE_LINK}/${character?.profile_path}`}
                                alt={character?.name}
                            />
                            <Typography color='textPrimary'>{character?.name}</Typography>
                            <Typography color='textSecondary'>{character?.character?.split('/')[0]}</Typography>
                        </Grid>))
                    ).slice(0, 6)}
                </Grid>
                <Grid item container style={{ marginTop: '2rem' }}> {/* Buttons Grid */}
                    <div className={classes.buttonsContainer}>
                        <Grid item className={classes.buttonsContainer} style={{ marginBottom: '20px', marginLeft: 'auto', marginRight: 'auto' }}>
                            <ButtonGroup size='medium' variant='outlined'>
                                <Button
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    href={data?.homepage ? data?.homepage : '#'}
                                    endIcon={<Language />}
                                > Website </Button>
                                <Button
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    href={`https://www.imdb.com/title/${data?.imdb_id}`}
                                    endIcon={<MovieIcon />}
                                > IMDB </Button>
                            </ButtonGroup>
                        </Grid>
                        <Grid item className={classes.buttonsContainer} style={{ marginBottom: '20px', marginLeft: 'auto', marginRight: 'auto' }}>
                            <ButtonGroup size='medium' variant='outlined'>
                                <Button
                                    onClick={() => setOpen(true)} // open trailer videoa
                                    href=''
                                    endIcon={<Theaters />}
                                    disabled={data?.videos?.results?.length > 0 ? false : true}
                                > Trailer </Button>
                                <Button
                                    onClick={() => setPlayMovie(true)}
                                    endIcon={<MovieIcon />}
                                > Watch Now
                                </Button>
                            </ButtonGroup>
                        </Grid>
                        <Grid item className={classes.buttonsContainer} style={{ marginBottom: '20px', marginLeft: 'auto', marginRight: 'auto' }}>
                            <ButtonGroup size='medium' variant='outlined'>
                                <Button
                                    onClick={addToFavorites}
                                    endIcon={isMovieFavorited ? <FavoriteBorderOutlined /> : <Favorite />}
                                > {isMovieFavorited ? 'Unfavorite' : 'Favorite'} </Button>
                                <Button
                                    onClick={addToWatchlist}
                                    endIcon={isMovieWatchlisted ? <Remove /> : <PlusOne />}
                                > WatchList </Button>
                                {/* <Button sx={{ borderColor: 'primary.main' }} endIcon={<ArrowBack />} >
                                    <Typography
                                        component={Link}
                                        to={`/`}
                                        color='inherit'
                                        variant='subtitle2'
                                        style={{ textDecoration: 'none' }}
                                    > Back </Typography>
                                </Button> */}
                            </ButtonGroup>
                        </Grid>
                    </div>
                </Grid>
            </Grid>


            {/* Recommended Movies */}
            {recommendations?.total_results > 0 ? <Box marginTop='5rem' width='100%'>
                <Typography variant='h3' gutterBottom align='center'>You might also like</Typography>
                <MovieList movies={recommendations} numberOfMovies={12} />
            </Box> : null}


            {/* Modal Movie */}
            {playMovie && <Modal
                closeAfterTransition
                className={classes.modal}
                open={playMovie}
                disableBackdropClick
            >
                <div className={classes.movieModelDiv} >
                    <Grid item className={classes.buttonsContainer}>
                        <ButtonGroup size='medium' variant='contained' >
                            <Button
                                onClick={() => setMovieServer(1)}
                                endIcon={<Dns />}
                            > Server 1 </Button>
                            <Button
                                onClick={() => setMovieServer(2)}
                                endIcon={<Dns />}
                            > Server 2 </Button>
                        </ButtonGroup>
                        <ButtonGroup size='medium' variant='contained' >
                            <Button
                                onClick={() => setPlayMovie(false)}
                                endIcon={<Close />}
                            > Close </Button>
                        </ButtonGroup>
                    </Grid>
                    <iframe
                        autoPlay
                        frameBorder='0'
                        title='Movie'
                        // src={ `https://www.2embed.cc/embed/${id}` or  `https://vidsrc.xyz/embed/movie/${id}` }
                        src={movieServer === 1 ? `https://www.2embed.cc/embed/${id}` : `https://vidsrc.xyz/embed/movie/${id}`}
                        allow='autoplay'
                        allowFullScreen
                        scrolling="no"
                        width="100%"
                        height="100%"
                    />
                </div>
            </Modal>}


            {/* Modal Trailer Youtube Video */}
            {data?.videos?.results?.length > 0 && <Modal
                closeAfterTransition
                className={classes.modal}
                open={open}
                onClose={() => setOpen(false)}
            >
                <iframe
                    autoPlay
                    className={classes.videos}
                    frameBorder='0'
                    title='Trailer'
                    src={`https://www.youtube.com/embed/${data?.videos?.results[0]?.key}`}
                    allow='autoplay'
                />
            </Modal>}
        </Grid>
    </>
}
