import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL, API_TMDB_KEY } from '../utils/constants';


export const tmdbApi = createApi({
    reducerPath: 'tmdbApi',
    baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
    endpoints: (builder) => ({

        // * Get Genres, mediaType is 'movie' or 'tv'
        getGenres: builder.query({
            query: (mediaType = 'movie') => `/genre/${mediaType}/list?api_key=${API_TMDB_KEY}`
        }),

        //* Get Movies or TV shows by [Type]
        getMovies: builder.query({
            query: ({ mediaType = 'movie', genreIdOrCategoryName, page, searchQuery, searchType = 'multi' }) => {

                //* Get Movies and TV shows by Search, searchType is 'multi', 'movie' or 'tv'
                if (searchQuery) {
                    return `/search/${searchType}?query=${encodeURIComponent(searchQuery)}&page=${page}&api_key=${API_TMDB_KEY}`;
                }

                //* Get by Category
                if (genreIdOrCategoryName && typeof genreIdOrCategoryName === 'string') {
                    return `/${mediaType}/${genreIdOrCategoryName}?page=${page}&api_key=${API_TMDB_KEY}`;
                }

                //* Get by Genre
                if (genreIdOrCategoryName && typeof genreIdOrCategoryName === 'number') {
                    return `discover/${mediaType}?with_genres=${genreIdOrCategoryName}&page=${page}&api_key=${API_TMDB_KEY}`;
                }

                //* Get Popular
                return `/${mediaType}/popular?page=${page}&api_key=${API_TMDB_KEY}`;
            },
            // A multi search also returns people, which have no page here
            transformResponse: (response) => ({
                ...response,
                results: response?.results?.filter((result) => result?.media_type !== 'person'),
            }),
        }),

        //* Get Movie
        getMovie: builder.query({
            query: (id) => `/movie/${id}?append_to_response=videos,credits&api_key=${API_TMDB_KEY}`,
        }),

        //* Get TV Show
        getTvShow: builder.query({
            query: (id) => `/tv/${id}?append_to_response=videos,credits,external_ids&api_key=${API_TMDB_KEY}`,
        }),

        //* Get the episodes of one season of a TV show
        getSeason: builder.query({
            query: ({ id, seasonNumber }) => `/tv/${id}/season/${seasonNumber}?api_key=${API_TMDB_KEY}`,
        }),

        //* Get User Specific Lists, e.g. listName 'favorite/movies' or 'watchlist/tv'
        getList: builder.query({
            query: ({ listName, accountId, sessionId, page }) =>
                `/account/${accountId}/${listName}?page=${page}&session_id=${sessionId}&api_key=${API_TMDB_KEY}`
        }),

        getRecommendations: builder.query({
            query: ({ mediaType = 'movie', movie_id, list }) => `/${mediaType}/${movie_id}/${list}?api_key=${API_TMDB_KEY}`,
        }),

        getActorsDetails: builder.query({
            query: (id) => `/person/${id}?api_key=${API_TMDB_KEY}`,
        }),

        getMoviesByActorId: builder.query({
            query: ({ id, page }) => `/discover/movie?with_cast=${id}&page=${page}&api_key=${API_TMDB_KEY}`,
        }),


    }),
});

export const {
    useGetGenresQuery,
    useGetMoviesQuery,
    useGetMovieQuery,
    useGetTvShowQuery,
    useGetSeasonQuery,
    useGetListQuery,
    useGetRecommendationsQuery,
    useGetActorsDetailsQuery,
    useGetMoviesByActorIdQuery,
} = tmdbApi;
