import { useEffect, useState } from 'react';
import { MOVIE_WATCH_SERVERS } from './constants.js';

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

// Tab label from the server host, e.g. https://vidsrc.xyz/embed/movie -> "vidsrc"
function getServerName(baseUrl, index) {
    try {
        return new URL(baseUrl).hostname.replace(/^www\./, '').split('.')[0];
    } catch (error) {
        return `Server ${index + 1}`;
    }
}

// Checks every configured watch server for this movie in parallel.
// status: 'checking' (none working yet, some still pending) | 'available' | 'unavailable'
// servers: the working servers, in .env order: [{ name, url }]
export default function useWatchLink(movieId, releaseDate) {
    const [result, setResult] = useState({ status: 'checking', servers: [] });

    useEffect(() => {
        let isCancelled = false;
        const isUnreleased = releaseDate && new Date(releaseDate) > new Date();
        const candidates = MOVIE_WATCH_SERVERS.map((baseUrl, index) => ({
            name: getServerName(baseUrl, index),
            url: `${baseUrl}/${movieId}`,
        }));

        if (!movieId || isUnreleased || candidates.length === 0) {
            setResult({ status: 'unavailable', servers: [] });
            return undefined;
        }

        setResult({ status: 'checking', servers: [] });
        // null = still checking, true/false = reachable or not
        const reachable = candidates.map(() => null);
        candidates.forEach(async (candidate, index) => {
            reachable[index] = await isLinkReachable(candidate.url);
            if (isCancelled) return;
            const servers = candidates.filter((_, i) => reachable[i]);
            const isDone = reachable.every((value) => value !== null);
            setResult({
                status: servers.length > 0 ? 'available' : isDone ? 'unavailable' : 'checking',
                servers,
            });
        });

        return () => {
            isCancelled = true;
        };
    }, [movieId, releaseDate]);

    return result;
}
