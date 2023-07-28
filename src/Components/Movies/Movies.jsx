import React, { useState } from 'react'
import useStyles from './Movies.style.js'
import { Box, useMediaQuery, Typography } from '@mui/material'
import { useSelector } from 'react-redux';
import { useGetMoviesQuery } from '../../services/TMDB.js';
import { Loader, MovieList, Pagination } from './../index.js'


export default function Movies() {
    const classes = useStyles();
    const [page, setPage] = useState(1);
    const { genreIdOrCategoryName, searchQuery } = useSelector((state)=> state.curruntGenreOrCategory);
    const { data, error, isLoading, isFetching } = useGetMoviesQuery({ genreIdOrCategoryName, page, searchQuery });

    const lg = useMediaQuery((theme)=> theme.breakpoints.only('lg'));
    const numberOfMovies = lg? 20 : 18;



    if(isFetching) return <Loader size={'4rem'}/>

    if(!data?.results?.length) {
        <Box display='flex' alignItems='center' mt='20px'>
            <Typography variant='h4'>
                No movies that match that name.
                <br />
                Please search for something else.
            </Typography>
        </Box>
    }

    if(error) return <div>An error has occurd.</div>;

    return <>
        <div>
            <MovieList movies={data} numberOfMovies={numberOfMovies} />
            <Pagination curruntPage={page} setPage={setPage} totalPages={data?.total_pages} />
        </div>
    </>
}
