import { createSlice } from '@reduxjs/toolkit';

// The kind of title the navbar browses. The genre, category, search and page live in the URL (utils/browse.js)
export const genreOrCategory = createSlice({
    name: 'genreOrCategory',
    initialState: {
        mediaType: 'movie',
    },
    reducers: {
        // 'movie' or 'tv'
        setMediaType: (state, action) => {
            state.mediaType = action.payload;
        },
    },
});

export const { setMediaType } = genreOrCategory.actions;

export default genreOrCategory.reducer;
