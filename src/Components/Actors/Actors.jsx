import React, { useState } from 'react'
import useStyles from './Actors.style.js'
import { Box, Button, Grid, Typography } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';
import { useGetActorsDetailsQuery, useGetMoviesByActorIdQuery } from '../../services/TMDB.js';
import { Loader, MovieList, NotFound, Pagination } from './../index.js'
import moviePoster from './../../assests/movie-poster.png'
import { Helmet } from 'react-helmet';

export default function Actors() {
    const classes = useStyles();
    const { id } = useParams();
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const { data, isFetching, error } = useGetActorsDetailsQuery(id);
    const { data: movies } = useGetMoviesByActorIdQuery({id, page});



    if (isFetching) return <Loader size='8rem' />
    if (error) return <NotFound path={`/`} message='Something has gone wrong - Go back' />

    return <>
        <Helmet>
            <title>Actor: {data?.name}</title>
        </Helmet>
        <Grid container spacing={3} >
            <Grid item lg={5} xl={4} >
                <img
                    className={classes.image}
                    src={data?.profile_path ? `${process.env.REACT_APP_IMAGE_BASE_LINK}/${data?.profile_path}` : moviePoster}
                    alt={data?.name}
                />
            </Grid>
            <Grid item lg={7} xl={8} className={classes.details}>
                <Typography variant='h2' gutterBottom> {data?.name} </Typography>
                <Typography variant='h5' gutterBottom> Born: {new Date(data?.birthday).toDateString()} </Typography>
                <Typography variant='body1' align='justify' paragraph > {data?.biography || 'Sorry, no biography yet...'} </Typography>
                <Box marginTop='2rem' display='flex' justifyContent='space-around'>
                    <Button
                        variant='contained'
                        color='primary'
                        target='_blank'
                        href={`https://www.imdb.com/name/${data?.imdb_id}`}
                    >IMDB</Button>
                    <Button startIcon={<ArrowBack />} onClick={() => navigate('/')} color='primary'> Back </Button>
                </Box>
            </Grid>
        </Grid>
        {movies?.total_results > 0 ? <Box marginTop='5rem' width='100%'> {/* Recommended Movies */}
            <Typography variant='h2' gutterBottom align='center'>Movies</Typography>
            <MovieList movies={movies} numberOfMovies={12} />
            <Pagination curruntPage={page} setPage={setPage} totalPages={movies?.total_pages} />
        </Box> : null}
    </>
}
