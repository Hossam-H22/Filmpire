import axios from "axios";
import { API_BASE_URL, API_TMDB_KEY } from "./constants.js";

export const moviesApi = axios.create({
    baseURL: API_BASE_URL,
    params: {
        api_key: API_TMDB_KEY,
    },
});

export const fetchToken = async () => {
    try {
        const { data } = await moviesApi.get('/authentication/token/new');
        const token = data?.request_token;
        if (data.success) {
            localStorage.setItem('request_token', token);
            window.location.href = `https://www.themoviedb.org/authenticate/${token}?redirect_to=${window.location.origin}/approved`;
        }
    } catch (error) {
        console.log('Sorry, your token could not be created.');
    }
}


export const createSessionId = async () => {
    const token = localStorage.getItem('request_token');

    if (token) {
        try {
            const { data: { session_id } } = await moviesApi.post('/authentication/session/new', {
                request_token: token,
            });
            localStorage.setItem('session_id', session_id);
            return session_id;
        } catch (error) {
            console.log(error);
        }
    }
}



