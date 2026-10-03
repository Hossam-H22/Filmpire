export const API_TMDB_KEY = process.env.REACT_APP_TMDB_KEY;
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
export const IMAGE_BASE_LINK = process.env.REACT_APP_IMAGE_BASE_LINK;
export const SYSTEM_NAME = process.env.REACT_APP_SYSTEM_NAME || 'Filmpire';
function parseServerList(value) {
    return (value || '')
        .split(',')
        .map((url) => url.trim().replace(/\/+$/, ''))
        .filter(Boolean);
}
// Comma-separated lists of watch server base URLs. Movies append /{id}, TV appends /{id}/{season}/{episode},
// unless the URL has its own {id}, {season} and {episode} placeholders
export const MOVIE_WATCH_SERVERS = parseServerList(process.env.REACT_APP_MOVIE_WATCH_SERVERS);
export const TV_WATCH_SERVERS = parseServerList(process.env.REACT_APP_TV_WATCH_SERVERS);
export const IMAGE_BACKDROP_BASE_LINK = process.env.REACT_APP_IMAGE_BACKDROP_BASE_LINK;
export const TMDB_AVATAR_BASE_URL = process.env.REACT_APP_TMDB_AVATAR_BASE_URL;
export const YOUTUBE_EMBED_BASE_URL = process.env.REACT_APP_YOUTUBE_EMBED_BASE_URL;
export const CATEGORIES = [
    { label: 'Popular', value: 'popular' },
    { label: 'Top Rated', value: 'top_rated' },
    { label: 'Upcoming', value: 'upcoming' },
];
// TMDB never returns more than 500 pages for a list
export const MAX_TMDB_PAGES = 500;