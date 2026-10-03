import { createSlice } from '@reduxjs/toolkit';

export const genreOrCategory = createSlice({
    name: 'genreOrCategory',
    initialState: {
        mediaType: 'movie',
        genreIdOrCategoryName: '',
        page: 1,
    },
    reducers: {
        selectGenreOrCategory: (state, action) => {
            state.genreIdOrCategoryName = action.payload;
        },
        // 'movie' or 'tv'; genres and categories differ between them, so switching starts again from Popular
        setMediaType: (state, action) => {
            if (state.mediaType === action.payload) return;
            state.mediaType = action.payload;
            state.genreIdOrCategoryName = '';
        },
    },
});

export const { selectGenreOrCategory, setMediaType } = genreOrCategory.actions;

export default genreOrCategory.reducer;
