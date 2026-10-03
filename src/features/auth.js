import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: {},
    isAuthenticated: false,
    sessionId: '',
    // True while a stored session is being checked, so the navbar doesn't flash the Login button
    isLoading: Boolean(localStorage.getItem('session_id')),
}

export const authSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        startLogin: (state) => {
            state.isLoading = true;
        },
        // payload: { user, sessionId }
        setUser: (state, action) => {
            state.user = action.payload.user;
            state.sessionId = action.payload.sessionId;
            state.isAuthenticated = true;
            state.isLoading = false;
        },
        clearUser: () => ({ ...initialState, isLoading: false }),
    },
});

export const { startLogin, setUser, clearUser } = authSlice.actions;

export default authSlice.reducer;

export const userSelector = (state) => state.user;
