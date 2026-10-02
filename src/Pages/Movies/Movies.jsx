import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FeaturedMovie, GenreFilter, Loader, MovieList, PageContainer, Pagination, SectionHeader } from './../../Components/index.js';
import { useGetGenresQuery, useGetMoviesQuery } from './../../services/TMDB.js';
import { CATEGORIES, MAX_TMDB_PAGES } from './../../utils/constants.js';
import useStyles from './Movies.style.js';


export default function Movies() {
    const classes = useStyles();
    const [page, setPage] = useState(1);
    const { genreIdOrCategoryName, searchQuery } = useSelector((state) => state.curruntGenreOrCategory);
    const { data, error, isLoading, isFetching } = useGetMoviesQuery({ genreIdOrCategoryName, page, searchQuery });
    const { data: genres } = useGetGenresQuery();

    // A new filter or search starts again from the first page
    useEffect(() => {
        setPage(1);
    }, [genreIdOrCategoryName, searchQuery]);

    if (isLoading) return <Loader size={'4rem'} />

    if (error) return <PageContainer sx={{ py: 6 }}><Typography variant='h5'>An error has occurred.</Typography></PageContainer>;

    const genreName = genres?.genres?.find(({ id }) => id === genreIdOrCategoryName)?.name;
    const categoryLabel = CATEGORIES.find(({ value }) => value === (genreIdOrCategoryName || 'popular'))?.label;
    const listTitle = searchQuery ? `Results for “${searchQuery}”` : genreName ?? categoryLabel ?? 'Popular';
    const eyebrow = searchQuery ? 'Top result' : `Featured · #1 in ${listTitle}`;
    const hasMovies = data?.results?.length > 0;

    return <>
        {hasMovies && page === 1 && <FeaturedMovie movie={data?.results[0]} eyebrow={eyebrow} />}
        <PageContainer>
            <GenreFilter />
            <Box component='section' className={classes.section} sx={{ opacity: isFetching ? 0.5 : 1 }}>
                <SectionHeader title={listTitle}>
                    {hasMovies && <>Page {page} of {Math.min(data?.total_pages, MAX_TMDB_PAGES)} · {data?.total_results?.toLocaleString()} titles</>}
                </SectionHeader>
                {hasMovies ? (
                    <MovieList movies={data} numberOfMovies={data?.results?.length} excludeFirst={page === 1} />
                ) : (
                    <div className={classes.empty}>
                        <Typography variant='h6'>No movies match that name.</Typography>
                        <Typography color='text.secondary'>Try a different title, or pick a category above.</Typography>
                    </div>
                )}
            </Box>
            <Pagination curruntPage={page} setPage={setPage} totalPages={data?.total_pages} />
        </PageContainer>
    </>
}
