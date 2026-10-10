import { Box, Button, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate, useNavigationType } from 'react-router-dom';
import { BrowseSkeleton, ErrorState, FeaturedMovie, GenreFilter, MovieList, PageContainer, Pagination, SectionHeader, Tabs } from './../../Components/index.js';
import { useGetGenresQuery, useGetMoviesQuery } from './../../services/TMDB.js';
import { browseUrl, useBrowseParams } from './../../utils/browse.js';
import { CATEGORIES, IMAGE_BACKDROP_BASE_LINK, MAX_TMDB_PAGES, MEDIA_HOME, SYSTEM_NAME } from './../../utils/constants.js';
import useStyles from './Movies.style.js';

// TMDB returns this many titles per page, so a title's rank across pages can be worked out
const PAGE_SIZE = 20;
// How long a card has to be hovered before the banner switches to it, so sweeping the mouse over the grid doesn't flicker it
const PREVIEW_DELAY = 120;

const SEARCH_TYPES = [
    { label: 'All', value: 'multi' },
    { label: 'Movies', value: 'movie' },
    { label: 'TV Shows', value: 'tv' },
];

// Home page of movies (mediaType 'movie') or TV shows ('tv'), and search results for both.
// The genre, category, search and page all come from the URL, so reload, Back and shared links keep them
export default function Movies({ mediaType = 'movie' }) {
    const classes = useStyles();
    const navigate = useNavigate();
    const navigationType = useNavigationType();
    const list = useRef(null);
    const previous = useRef(null);
    const params = useBrowseParams(mediaType);
    const { s: searchQuery, genre, category, type: searchType, page } = params;
    const genreIdOrCategoryName = genre ?? (category === 'popular' ? '' : category);
    const { data, error, isLoading, isFetching, refetch } = useGetMoviesQuery({ mediaType, genreIdOrCategoryName, page, searchQuery, searchType });
    const { data: genres } = useGetGenresQuery(mediaType);
    const isTv = mediaType === 'tv';
    const results = data?.results;
    const count = results?.length ?? 0;

    // The banner cycles through every title on the page. Hovering or focusing a card shows that card instead,
    // and the cycle carries on from it once the card is left. A new list starts again from its first title
    const [featured, setFeatured] = useState({ list: results, index: 0 });
    const [preview, setPreview] = useState(null);
    const [paused, setPaused] = useState(false);
    const previewTimer = useRef(null);
    const featuredIndex = featured.list === results ? featured.index : 0;
    const previewIndex = preview ? results?.indexOf(preview) ?? -1 : -1;
    const bannerIndex = previewIndex >= 0 ? previewIndex : featuredIndex;

    useEffect(() => () => clearTimeout(previewTimer.current), []);

    // Fetch the next backdrop ahead of time so it is ready when the banner moves on
    useEffect(() => {
        const next = results?.[(featuredIndex + 1) % results.length];
        if (next?.backdrop_path) new Image().src = `${IMAGE_BACKDROP_BASE_LINK}/${next.backdrop_path}`;
    }, [results, featuredIndex]);

    function feature(index) {
        setFeatured({ list: results, index: (index + count) % count });
    }

    function startPreview(movie) {
        clearTimeout(previewTimer.current);
        previewTimer.current = setTimeout(() => setPreview(movie), PREVIEW_DELAY);
    }

    function endPreview() {
        clearTimeout(previewTimer.current);
        if (previewIndex >= 0) feature(previewIndex);
        setPreview(null);
    }

    // Another page of the same list brings the list back into view; a new filter or search starts from the top.
    // Back and Forward are left to NavigationScroll, which restores the old position
    useEffect(() => {
        const filters = `${mediaType}|${searchQuery}|${genre}|${category}|${searchType}`;
        const last = previous.current;
        previous.current = { filters, page };
        if (!last || navigationType === 'POP') return;

        if (last.filters !== filters) {
            if (window.scrollY > 0) window.scrollTo(0, 0);
        } else if (last.page !== page) {
            list.current?.scrollIntoView({ block: 'start' });
        }
    }, [mediaType, searchQuery, genre, category, searchType, page, navigationType]);

    function goTo(changes) {
        navigate(browseUrl(mediaType, { ...params, ...changes }));
    }

    if (isLoading) return <BrowseSkeleton />

    if (error) return <ErrorState
        title={`We couldn't load ${isTv ? 'shows' : 'movies'}`}
        onRetry={refetch}
        homePath={MEDIA_HOME[mediaType]}
    />;

    const genreName = genres?.genres?.find(({ id }) => id === genre)?.name;
    const categoryLabel = CATEGORIES[mediaType].find(({ value }) => value === category)?.label;
    const listTitle = searchQuery ? `Results for “${searchQuery}”` : genreName ?? categoryLabel ?? 'Popular';
    const rank = (page - 1) * PAGE_SIZE + bannerIndex + 1;
    const eyebrow = searchQuery
        ? (rank === 1 ? 'Top result' : `Result #${rank}`)
        : `Featured · #${rank} in ${isTv ? `${listTitle} series` : listTitle}`;
    const hasMovies = count > 0;
    const searchedType = searchType === 'multi' ? undefined : searchType;

    return <>
        <Helmet>
            <title>{`${searchQuery ? listTitle : `${listTitle} ${isTv ? 'TV Shows' : 'Movies'}`} | ${SYSTEM_NAME}`}</title>
        </Helmet>
        {hasMovies && <FeaturedMovie
            movie={results[bannerIndex]}
            eyebrow={eyebrow}
            mediaType={searchQuery ? searchedType : mediaType}
            carousel={{
                count,
                paused: paused || previewIndex >= 0,
                onNext: () => feature(bannerIndex + 1),
                onPause: setPaused,
            }}
        />}
        <PageContainer>
            <GenreFilter mediaType={mediaType} />
            <Box component='section' ref={list} className={classes.section} sx={{ opacity: isFetching ? 0.5 : 1 }} aria-busy={isFetching}>
                <SectionHeader title={listTitle}>
                    {hasMovies && <>Page {page} of {Math.min(data?.total_pages, MAX_TMDB_PAGES)} · {data?.total_results?.toLocaleString()} titles</>}
                </SectionHeader>
                {searchQuery && <div className={classes.searchTypes}>
                    <Tabs label='Result type' tabs={SEARCH_TYPES} value={searchType} onChange={(value) => goTo({ type: value, page: 1 })} />
                </div>}
                {hasMovies ? (
                    <MovieList
                        movies={data}
                        numberOfMovies={data?.results?.length}
                        onPreview={startPreview}
                        onPreviewEnd={endPreview}
                        mediaType={searchQuery ? searchedType : mediaType}
                        showType={searchQuery && searchType === 'multi'}
                    />
                ) : (
                    <div className={classes.empty}>
                        <Typography variant='h6'>{searchQuery ? 'Nothing matches that name.' : `No ${isTv ? 'shows' : 'movies'} here yet.`}</Typography>
                        <Typography color='text.secondary'>
                            {searchQuery ? 'Check the spelling, or try another title.' : 'Pick another category or genre above.'}
                        </Typography>
                        {(searchQuery || page > 1) && <Button component={Link} to={MEDIA_HOME[mediaType]} variant='outlined' color='inherit' className={classes.emptyButton}>
                            Browse popular {isTv ? 'shows' : 'movies'}
                        </Button>}
                    </div>
                )}
            </Box>
            <Pagination curruntPage={page} setPage={(nextPage) => goTo({ page: nextPage })} totalPages={data?.total_pages} />
        </PageContainer>
    </>
}
