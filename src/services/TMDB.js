
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { List } from '@mui/material';

const tmdbApiKey = process.env.REACT_APP_TMDB_KEY;

export const tmdbApi = createApi({
    reducerPath: 'tmdbApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_BASE_URL }),
    endpoints: (builder)=>({

        // * Get Genres
        getGenres: builder.query({
            query: ()=> `/genre/movie/list?api_key=${tmdbApiKey}`
        }),

        //* Get Movies by [Type]
        getMovies: builder.query({
            query: ({ genreIdOrCategoryName, page, searchQuery })=> {

                //* Get Movies by Search
                if(searchQuery){
                    return `/search/movie?query=${searchQuery}&page=${page}&api_key=${tmdbApiKey}`;
                }
                
                //* Get Movies by Category
                if(genreIdOrCategoryName && typeof genreIdOrCategoryName === 'string') {
                    return  `/movie/${genreIdOrCategoryName}?page=${page}&api_key=${tmdbApiKey}`;
                }
                
                //* Get Movies by Genre
                if (genreIdOrCategoryName && typeof genreIdOrCategoryName === 'number'){
                    return `discover/movie?with_genres=${genreIdOrCategoryName}&page=${page}&api_key=${tmdbApiKey}`;
                }
                
                //* Get Popular Movies
                return `/movie/popular?page=${page}&api_key=${tmdbApiKey}`;
            }
        }),

        //* Get Movie
        getMovie: builder.query({
            query: (id)=> `/movie/${id}?append_to_response=videos,credits&api_key=${tmdbApiKey}`,
        }),

        //* Get User Specific Lists
        getList: builder.query({
            query: ({listName, accountId, sessionId, page}) => 
                `/account/${accountId}/${listName}?page=${page}&session_id=${sessionId}&api_key=${tmdbApiKey}`
        }),
        
        getRecommendations: builder.query({
            query: ({ movie_id, list })=> `/movie/${movie_id}/${list}?api_key=${tmdbApiKey}`,
        }),

        getActorsDetails: builder.query({
            query: (id) => `/person/${id}?api_key=${tmdbApiKey}`,
        }),

        getMoviesByActorId: builder.query({
            query: ({id, page}) => `/discover/movie?with_cast=${id}&page=${page}&api_key=${tmdbApiKey}`,
        }),


    }),
});

export const { 
    useGetGenresQuery, 
    useGetMoviesQuery, 
    useGetMovieQuery, 
    useGetListQuery, 
    useGetRecommendationsQuery, 
    useGetActorsDetailsQuery, 
    useGetMoviesByActorIdQuery, 
} = tmdbApi;