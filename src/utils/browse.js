import { useSearchParams } from 'react-router-dom';
import { CATEGORIES, MAX_TMDB_PAGES, MEDIA_HOME } from './constants.js';

const SEARCH_TYPES = ['multi', 'movie', 'tv'];

// Home URL of a media type ('movie' | 'tv') with its filters { genre, category, s, type, page }.
// A search ignores genre and category; defaults (Popular, all types, page 1) stay out of the URL
export function browseUrl(mediaType, { genre, category, s, type, page } = {}) {
    const params = new URLSearchParams();
    if (s) {
        params.set('s', s);
        if (type && type !== 'multi') params.set('type', type);
    } else if (genre) {
        params.set('genre', genre);
    } else if (category && category !== 'popular') {
        params.set('category', category);
    }
    if (page > 1) params.set('page', page);

    const query = params.toString();
    return `${MEDIA_HOME[mediaType]}${query ? `?${query}` : ''}`;
}

// Filters of the home page of mediaType, read from the URL.
// Exactly one of s (search), genre (TMDB genre id) or category is set; type is the search result type
export function useBrowseParams(mediaType) {
    const [searchParams] = useSearchParams();
    const s = searchParams.get('s')?.trim() ?? '';
    const genre = s ? null : Number(searchParams.get('genre')) || null;
    const categoryParam = searchParams.get('category');
    const isKnownCategory = CATEGORIES[mediaType]?.some(({ value }) => value === categoryParam);
    const category = s || genre ? null : isKnownCategory ? categoryParam : 'popular';
    const type = SEARCH_TYPES.includes(searchParams.get('type')) ? searchParams.get('type') : 'multi';
    const page = Math.min(Math.max(parseInt(searchParams.get('page'), 10) || 1, 1), MAX_TMDB_PAGES);

    return { s, genre, category, type, page };
}
