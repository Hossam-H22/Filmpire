import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { FeaturedMovie, GenreFilter, Loader, MovieList, PageContainer, Pagination, SectionHeader, Tabs } from './../../Components/index.js';
import { useGetGenresQuery, useGetMoviesQuery } from './../../services/TMDB.js';
import { CATEGORIES, MAX_TMDB_PAGES } from './../../utils/constants.js';
import useStyles from './Movies.style.js';

const SEARCH_TYPES = [
    { label: 'All', value: 'multi' },
    { label: 'Movies', value: 'movie' },
    { label: 'TV Shows', value: 'tv' },
];

// Home page of movies (mediaType 'movie') or TV shows ('tv'), and search results for both
export default function Movies({ mediaType = 'movie' }) {
    const classes = useStyles();
    const [page, setPage] = useState(1);
    const [searchType, setSearchType] = useState('multi');
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('s') ?? '';
    const selection = useSelector((state) => state.curruntGenreOrCategory);
    // Until the route's media type reaches the store, the selection still belongs to the other type
    const genreIdOrCategoryName = selection.mediaType === mediaType ? selection.genreIdOrCategoryName : '';
    const { data, error, isLoading, isFetching } = useGetMoviesQuery({ mediaType, genreIdOrCategoryName, page, searchQuery, searchType });
    const { data: genres } = useGetGenresQuery(mediaType);
    const isTv = mediaType === 'tv';

    // A new filter or search starts again from the first page
    useEffect(() => {
        setPage(1);
    }, [mediaType, genreIdOrCategoryName, searchQuery, searchType]);

    useEffect(() => {
        setSearchType('multi');
    }, [searchQuery]);

    if (isLoading) return <Loader size={'4rem'} />

    if (error) return <PageContainer sx={{ py: 6 }}><Typography variant='h5'>An error has occurred.</Typography></PageContainer>;

    const genreName = genres?.genres?.find(({ id }) => id === genreIdOrCategoryName)?.name;
    const categoryLabel = CATEGORIES[mediaType].find(({ value }) => value === (genreIdOrCategoryName || 'popular'))?.label;
    const listTitle = searchQuery ? `Results for “${searchQuery}”` : genreName ?? categoryLabel ?? 'Popular';
    const eyebrow = searchQuery ? 'Top result' : `Featured · #1 in ${isTv ? `${listTitle} series` : listTitle}`;
    const hasMovies = data?.results?.length > 0;
    const searchedType = searchType === 'multi' ? undefined : searchType;

    return <>
        {hasMovies && page === 1 && <FeaturedMovie movie={data?.results[0]} eyebrow={eyebrow} mediaType={searchQuery ? searchedType : mediaType} />}
        <PageContainer>
            <GenreFilter mediaType={mediaType} />
            <Box component='section' className={classes.section} sx={{ opacity: isFetching ? 0.5 : 1 }}>
                <SectionHeader title={listTitle}>
                    {hasMovies && <>Page {page} of {Math.min(data?.total_pages, MAX_TMDB_PAGES)} · {data?.total_results?.toLocaleString()} titles</>}
                </SectionHeader>
                {searchQuery && <div className={classes.searchTypes}>
                    <Tabs label='Result type' tabs={SEARCH_TYPES} value={searchType} onChange={setSearchType} />
                </div>}
                {hasMovies ? (
                    <MovieList
                        movies={data}
                        numberOfMovies={data?.results?.length}
                        excludeFirst={page === 1}
                        mediaType={searchQuery ? searchedType : mediaType}
                        showType={searchQuery && searchType === 'multi'}
                    />
                ) : (
                    <div className={classes.empty}>
                        <Typography variant='h6'>{searchQuery ? 'Nothing matches that name.' : `No ${isTv ? 'shows' : 'movies'} here yet.`}</Typography>
                        <Typography color='text.secondary'>Try a different title, or pick a category above.</Typography>
                    </div>
                )}
            </Box>
            <Pagination curruntPage={page} setPage={setPage} totalPages={data?.total_pages} />
        </PageContainer>
    </>
}
