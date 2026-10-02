import { useEffect, useState } from 'react';
import { MOVIE_BASE_URL1, MOVIE_BASE_URL2 } from './constants.js';

const PROBE_TIMEOUT_MS = 8000;

async function isLinkReachable(url) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), PROBE_TIMEOUT_MS);
    try {
        try {
            // Readable only when the provider allows CORS: then a 404 for this movie is detected too
            const response = await fetch(url, { signal: controller.signal });
            return response.ok;
        } catch (error) {
            if (controller.signal.aborted) return false;
            // CORS blocked the read: an opaque response still proves the server answered
            await fetch(url, { mode: 'no-cors', signal: controller.signal });
            return true;
        }
    } catch (error) {
        return false;
    } finally {
        clearTimeout(timeout);
    }
}

// Finds the first configured watch link that responds for this movie.
// status: 'checking' | 'available' | 'unavailable'
export default function useWatchLink(movieId, releaseDate) {
    const [result, setResult] = useState({ status: 'checking', url: null });

    useEffect(() => {
        let isCancelled = false;
        const isUnreleased = releaseDate && new Date(releaseDate) > new Date();
        const candidates = [MOVIE_BASE_URL1, MOVIE_BASE_URL2]
            .filter(Boolean)
            .map((baseUrl) => `${baseUrl}/${movieId}`);

        if (!movieId || isUnreleased || candidates.length === 0) {
            setResult({ status: 'unavailable', url: null });
            return undefined;
        }

        setResult({ status: 'checking', url: null });
        (async () => {
            for (const url of candidates) {
                if (await isLinkReachable(url)) {
                    if (!isCancelled) setResult({ status: 'available', url });
                    return;
                }
            }
            if (!isCancelled) setResult({ status: 'unavailable', url: null });
        })();

        return () => {
            isCancelled = true;
        };
    }, [movieId, releaseDate]);

    return result;
}
