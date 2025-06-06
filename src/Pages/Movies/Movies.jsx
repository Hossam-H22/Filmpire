import React, { useState } from 'react'
import { Box, Typography } from '@mui/material'
import { useSelector } from 'react-redux';
import { useGetMoviesQuery } from './../../services/TMDB.js';
import { FeaturedMovie, Loader, MovieList, Pagination } from './../../Components/index.js'


export default function Movies() {
    const [page, setPage] = useState(1);
    const { genreIdOrCategoryName, searchQuery } = useSelector((state) => state.curruntGenreOrCategory);
    const { data, error, isLoading, isFetching } = useGetMoviesQuery({ genreIdOrCategoryName, page, searchQuery });

    if (isFetching || isLoading) return <Loader size={'4rem'} />

    if (!data?.results?.length) {
        return <Box display='flex' alignItems='center' mt='20px'>
            <Typography variant='h4' color='text.primary'>
                No movies that match that name.
                <br />
                Please search for something else 🎥.
            </Typography>
        </Box>
    }

    if (error) return <div>An error has occurd.</div>;

    return <>
        <FeaturedMovie movie={data?.results[0]} />
        <MovieList movies={data} numberOfMovies={data?.results?.length} excludeFirst />
        <Pagination curruntPage={page} setPage={setPage} totalPages={data?.total_pages} />
    </>
}
