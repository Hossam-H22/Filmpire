import axios from "axios";
import { API_BASE_URL, API_TMDB_KEY } from "./constants.js";

export const moviesApi = axios.create({
    baseURL: API_BASE_URL,
    params: {
        api_key: API_TMDB_KEY,
    },
});

const REQUEST_TOKEN_KEY = 'request_token';
const SESSION_ID_KEY = 'session_id';
const RETURN_TO_KEY = 'login_return_to';

export const getStoredSessionId = () => localStorage.getItem(SESSION_ID_KEY);

// Removes only the login keys, so other settings such as the color mode survive
export const clearAuth = () => {
    localStorage.removeItem(REQUEST_TOKEN_KEY);
    localStorage.removeItem(SESSION_ID_KEY);
    localStorage.removeItem('accountId'); // written by older versions
}

// Step 1: get a request token and send the user to TMDB to approve it; TMDB redirects back to /approved
export const fetchToken = async () => {
    try {
        const { data } = await moviesApi.get('/authentication/token/new');
        if (data.success) {
            // Drop any old (possibly expired) session so it can't be reused after the new approval
            clearAuth();
            localStorage.setItem(REQUEST_TOKEN_KEY, data.request_token);
            // Remember the page the user logged in from, to come back to it after /approved
            const { pathname, search, hash } = window.location;
            localStorage.setItem(RETURN_TO_KEY, `${pathname}${search}${hash}`);
            window.location.href = `https://www.themoviedb.org/authenticate/${data.request_token}?redirect_to=${window.location.origin}/approved`;
        }
    } catch (error) {
        console.log('Sorry, your token could not be created.');
    }
}

// Step 2: exchange the approved request token for a session. Throws if TMDB refuses it
export const createSessionId = async (requestToken) => {
    const storedToken = localStorage.getItem(REQUEST_TOKEN_KEY);
    if (!storedToken || storedToken !== requestToken) throw new Error('Request token does not match the one this browser asked for.');

    try {
        const { data: { session_id } } = await moviesApi.post('/authentication/session/new', { request_token: requestToken });
        localStorage.setItem(SESSION_ID_KEY, session_id);
        return session_id;
    } finally {
        // A request token can only be exchanged once
        localStorage.removeItem(REQUEST_TOKEN_KEY);
    }
}

// The page saved by fetchToken, read once. Only same-site paths are accepted
export const takeLoginReturnPath = () => {
    const path = localStorage.getItem(RETURN_TO_KEY);
    localStorage.removeItem(RETURN_TO_KEY);
    const isSafe = path?.startsWith('/') && !path.startsWith('//') && !path.startsWith('/approved');
    return isSafe ? path : '/';
}

export const fetchAccount = async (sessionId) => {
    const { data } = await moviesApi.get('/account', { params: { session_id: sessionId } });
    return data;
}

// Ends the session on TMDB too, then reloads on the home page
export const logout = async () => {
    const sessionId = getStoredSessionId();
    if (sessionId) {
        try {
            await moviesApi.delete('/authentication/session', { data: { session_id: sessionId } });
        } catch (error) {
            console.log(error);
        }
    }
    clearAuth();
    window.location.href = '/';
}
