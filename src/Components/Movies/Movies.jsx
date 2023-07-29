import React, { useState } from 'react'
import useStyles from './Movies.style.js'
import { Box, useMediaQuery, Typography } from '@mui/material'
import { useSelector } from 'react-redux';
import { useGetMoviesQuery } from '../../services/TMDB.js';
import { FeaturedMovie, Loader, MovieList, Pagination } from './../index.js'


export default function Movies() {
    const classes = useStyles();
    const [page, setPage] = useState(1);
    const { genreIdOrCategoryName, searchQuery } = useSelector((state) => state.curruntGenreOrCategory);
    const { data, error, isLoading, isFetching } = useGetMoviesQuery({ genreIdOrCategoryName, page, searchQuery });

    const lg = useMediaQuery((theme) => theme.breakpoints.only('lg'));
    const numberOfMovies = lg ? 17 : 19;


    if (isFetching) return <Loader size={'4rem'} />

    if (!data?.results?.length) {
        return <>
            <Box display='flex' alignItems='center' mt='20px'>
                <Typography variant='h4'>
                    No movies that match that name.
                    <br />
                    Please search for something else 🎥.
                </Typography>
            </Box>
        </>
    }

    if (error) return <div>An error has occurd.</div>;

    return <>
        <div>
            <FeaturedMovie movie={data?.results[0]} />
            <MovieList movies={data} numberOfMovies={numberOfMovies} excludeFirst />
            <Pagination curruntPage={page} setPage={setPage} totalPages={data?.total_pages} />
        </div>
    </>
}
