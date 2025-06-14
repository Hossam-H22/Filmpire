import { Language } from '@mui/icons-material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { Box, Button, Grid, IconButton, Rating, Tooltip, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { ActorCard, CollapseLine, Loader, MovieList, TrailerCard } from './../../Components/index.js';
import { NotFound } from './../../Pages/index.js';
import genreIcons from './../../assests/genres/index.js';
import moviePoster from './../../assests/movie-poster.png';
import { userSelector } from './../../features/auth.js';
import { selectGenreOrCategory } from './../../features/currentGenreOrCategory.js';
import { useGetListQuery, useGetMovieQuery, useGetRecommendationsQuery } from './../../services/TMDB.js';
import { API_BASE_URL, API_TMDB_KEY, IMAGE_BASE_LINK, MOVIE_BASE_URL1, SYSTEM_NAME } from './../../utils/constants.js';
import useStyles from './MovieInformation.style.js';

export default function MovieInformation() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { user } = useSelector(userSelector);
    const [isMovieLoading, setIsMovieLoading] = useState(true);
    const [isMovieFavorited, setIsMovieFavorited] = useState(false);
    const [isMovieWatchlisted, setIsMovieWatchlisted] = useState(false);
    const { id } = useParams();

    const sessionId = localStorage.getItem('session_id');
    const { data, isFetching, error } = useGetMovieQuery(id);
    const { data: favoriteMovies } = useGetListQuery({ listName: 'favorite/movies', accountId: user.id, sessionId: sessionId, page: 1 });
    const { data: watchlistMovies } = useGetListQuery({ listName: 'watchlist/movies', accountId: user.id, sessionId: sessionId, page: 1 });
    const { data: recommendations } = useGetRecommendationsQuery({ list: 'recommendations', movie_id: id });

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
        await axios.post(`${API_BASE_URL}/account/${user?.id}/favorite?api_key=${API_TMDB_KEY}&session_id=${sessionId}`, {
            media_type: 'movie',
            media_id: id,
            favorite: !isMovieFavorited,
        }).catch((error) => console.log(error));
        setIsMovieFavorited((prev) => !prev);
    }

    async function addToWatchlist() {
        await axios.post(`${API_BASE_URL}/account/${user?.id}/watchlist?api_key=${API_TMDB_KEY}&session_id=${sessionId}`, {
            media_type: 'movie',
            media_id: id,
            watchlist: !isMovieWatchlisted,
        }).catch((error) => console.log(error));
        setIsMovieWatchlisted((prev) => !prev);
    }


    if (isFetching) return <Loader size='8rem' />

    if (error) return <NotFound message='Something has gone wrong - Go back' path='/' />

    return <>
        <Helmet>
            <title>{data?.title} | {SYSTEM_NAME}</title>
            <meta name="description" content={data?.overview} />
            <meta name="keywords" content={data?.genres?.map((genre) => genre?.name).join(', ')} />
            <meta name="image" content={`${IMAGE_BASE_LINK}/${data?.poster_path}`} />
            <meta property="og:title" content={data?.title} />
            <meta property="og:description" content={data?.overview} />
            <meta property="og:image" content={`${IMAGE_BASE_LINK}/${data?.poster_path}`} />
            <meta property="og:url" content={window.location.href} />
            <meta property="og:type" content="video.movie" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={data?.title} />
            <meta name="twitter:description" content={data?.overview} />
            <meta name="twitter:image" content={`${IMAGE_BASE_LINK}/${data?.poster_path}`} />
            <link rel="canonical" href={window.location.href} />
            <script type="application/ld+json">
                {`
                    {
                        "@context": "https://schema.org",
                        "@type": "Movie",
                        "name": "${data.title}",
                        "description": "${data.overview}",
                        "image": "${IMAGE_BASE_LINK}/${data?.poster_path}",
                        "datePublished": "${data.release_date}",
                        "aggregateRating": {
                            "@type": "AggregateRating",
                            "ratingValue": "${data.vote_average}",
                            "ratingCount": "${data.vote_count}"
                        }
                    }
            `}
            </script>
        </Helmet>
        <Grid container className={classes.containerSpaceAround} sx={{ padding: '20px' }} >
            <Grid item sm={12} lg={4} className={classes.posterContainer}> {/* Image Grid */}
                <img
                    className={classes.poster}
                    src={data?.poster_path ? `${IMAGE_BASE_LINK}/${data?.poster_path}` : moviePoster}
                    alt={data?.title}
                />
                <Box className={classes.posterButtons}>
                    <Tooltip title='Add to Favorites'>
                        <IconButton onClick={addToFavorites}>
                            {isMovieFavorited ? <FavoriteIcon fontSize='medium' sx={{ color: 'red' }} /> : <FavoriteBorderIcon fontSize='medium' sx={{ color: 'white' }} />}
                        </IconButton>
                    </Tooltip>
                    <Tooltip title='Add to Watchlist'>
                        <IconButton onClick={addToWatchlist}>
                            {isMovieWatchlisted ? <StarIcon fontSize='medium' sx={{ color: 'yellow' }} /> : <StarOutlineIcon fontSize='medium' sx={{ color: 'white' }} />}
                        </IconButton>
                    </Tooltip>
                </Box>
            </Grid>
            <Grid item container direction='column' sx={{ marginY: 'auto' }} lg={7} > {/* Film Data Grid */}
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
                <Grid item container gap={1} sx={{ justifyContent: 'center' }}> {/* Buttons Grid */}
                    <Button
                        size='small'
                        variant='outlined'
                        target='_blank'
                        rel='noopener noreferrer'
                        href={data?.homepage ? data?.homepage : '#'}
                        endIcon={<Language />}
                    > Website </Button>
                    <Button
                        size='small'
                        variant='outlined'
                        target='_blank'
                        rel='noopener noreferrer'
                        href={`https://www.imdb.com/title/${data?.imdb_id}`}
                        endIcon={<Language />}
                    > IMDB </Button>
                </Grid>
            </Grid>
            <Grid item container gap={2} xs={12} pt={5}>
                <CollapseLine title="Top Cast" > {/* Cast Data Grid */}
                    <Grid item container px={1} sx={{ display: 'flex', width: '100%' }}>
                        {data?.credits?.cast?.slice(0, 12).map((character) => (
                            character?.profile_path && (
                                <ActorCard character={character} key={character?.id} />
                            )
                        ))}
                    </Grid>
                </CollapseLine>
                <CollapseLine title="Trailers" >
                    <Grid item container px={1} sx={{ display: 'flex', width: '100%' }}>
                        {data?.videos?.results?.slice(0, 4).map((video) => (
                            <TrailerCard video={video} key={video.id} />
                        ))}
                    </Grid>
                </CollapseLine>
                <CollapseLine title="Watch Now" >
                    <Grid item container px={1} sx={{ display: 'flex', width: '100%', position: 'relative' }}>
                        {isMovieLoading && <div className={classes.movieLoader} >
                            <Loader size='4rem' removeMargin />
                        </div>}
                        <iframe
                            autoPlay
                            title='Movie'
                            src={`${MOVIE_BASE_URL1}/${id}`}
                            // src={`${MOVIE_BASE_URL2}/${id}`}
                            allow='autoplay'
                            allowFullScreen
                            scrolling="no"
                            onLoad={() => setIsMovieLoading(false)}
                            style={{ backgroundColor: "black", width: '100%', height: '100%', aspectRatio: '16/9', borderRadius: '10px' }}
                        />
                    </Grid>
                </CollapseLine>
            </Grid>

            {/* Recommended Movies */}
            {recommendations?.total_results > 0 && <Box marginTop='5rem' width='100%'>
                <Typography variant='h3' gutterBottom align='center'>You might also like</Typography>
                <MovieList movies={recommendations} numberOfMovies={12} />
            </Box>}
        </Grid>
    </>
}
