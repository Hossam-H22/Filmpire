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
// Comma-separated hostnames of watch servers that refuse to play in a sandboxed iframe, e.g. videm.xyz,2embed.cc.
// They play without the sandbox, so they can open ad tabs, and their tab is flagged "May show ads"
export const UNSANDBOXED_WATCH_HOSTS = parseServerList(process.env.REACT_APP_UNSANDBOXED_WATCH_SERVERS)
    .map((host) => host.replace(/^www\./, ''));
export const UNSANDBOXED_SERVER_BADGE = 'May show ads';
// Player iframe sandbox: everything a player needs, but no popups (ad tabs) and no navigating Filmpire away
export const WATCH_PLAYER_SANDBOX = 'allow-scripts allow-same-origin allow-forms allow-presentation';
export const IMAGE_BACKDROP_BASE_LINK = process.env.REACT_APP_IMAGE_BACKDROP_BASE_LINK;
export const TMDB_AVATAR_BASE_URL = process.env.REACT_APP_TMDB_AVATAR_BASE_URL;
export const YOUTUBE_EMBED_BASE_URL = process.env.REACT_APP_YOUTUBE_EMBED_BASE_URL;
export const MEDIA_TYPES = [
    { label: 'Movies', value: 'movie' },
    { label: 'TV Shows', value: 'tv' },
];
// Home route of each media type
export const MEDIA_HOME = { movie: '/', tv: '/tv' };
export const CATEGORIES = {
    movie: [
        { label: 'Popular', value: 'popular' },
        { label: 'Top Rated', value: 'top_rated' },
        { label: 'Upcoming', value: 'upcoming' },
    ],
    tv: [
        { label: 'Popular', value: 'popular' },
        { label: 'Top Rated', value: 'top_rated' },
        { label: 'On The Air', value: 'on_the_air' },
        { label: 'Airing Today', value: 'airing_today' },
    ],
};
// TMDB never returns more than 500 pages for a list
export const MAX_TMDB_PAGES = 500;