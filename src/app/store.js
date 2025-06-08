import { configureStore } from '@reduxjs/toolkit';
import useReducer from './../features/auth.js';
import genreOrCategoryReducer from './../features/currentGenreOrCategory.js';
import { tmdbApi } from './../services/TMDB.js';

export default configureStore({
    reducer: {
        [tmdbApi.reducerPath]: tmdbApi.reducer,
        curruntGenreOrCategory: genreOrCategoryReducer,
        user: useReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tmdbApi.middleware), // Add RTK-Query middleware here
});
