import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { userSelector } from './../features/auth.js';
import { useGetAccountStatesQuery } from './../services/TMDB.js';
import { API_BASE_URL, API_TMDB_KEY } from './constants.js';
import { showNotice } from './notify.js';

const LIST_LABELS = { favorite: 'favorites', watchlist: 'watchlist' };

// Favorite and watchlist state of one movie or TV show (mediaType 'movie' | 'tv'), with toggles that save to TMDB.
// Results and errors are shown with showNotice
export default function useSavedLists(mediaType, id) {
    const { user, isAuthenticated, sessionId } = useSelector(userSelector);
    const [isFavorited, setIsFavorited] = useState(false);
    const [isWatchlisted, setIsWatchlisted] = useState(false);
    const [pendingList, setPendingList] = useState(null);
    const noun = mediaType === 'tv' ? 'shows' : 'movies';

    const { data: states } = useGetAccountStatesQuery(
        { mediaType, id, sessionId },
        { skip: !isAuthenticated || !sessionId || !id, refetchOnMountOrArgChange: true },
    );

    useEffect(() => {
        setIsFavorited(Boolean(states?.favorite));
        setIsWatchlisted(Boolean(states?.watchlist));
    }, [states]);

    // listName is 'favorite' or 'watchlist'; the button only changes once TMDB confirms the update
    async function updateList(listName, isInList, setIsInList) {
        if (!isAuthenticated || !sessionId) {
            showNotice({ severity: 'info', message: `Please log in to save ${noun}.`, needsLogin: true });
            return;
        }

        setPendingList(listName);
        try {
            const { data: response } = await axios.post(`${API_BASE_URL}/account/${user?.id}/${listName}?api_key=${API_TMDB_KEY}&session_id=${sessionId}`, {
                media_type: mediaType,
                media_id: Number(id),
                [listName]: !isInList,
            });
            if (!response?.success) throw new Error(response?.status_message);
            setIsInList(!isInList);
            showNotice({
                severity: 'success',
                message: isInList ? `Removed from your ${LIST_LABELS[listName]}.` : `Added to your ${LIST_LABELS[listName]}.`,
            });
        } catch (error) {
            const isAuthError = error?.response?.status === 401;
            showNotice({
                severity: 'error',
                message: isAuthError
                    ? `Your TMDB login has expired. Log in again to save ${noun}.`
                    : error?.response?.data?.status_message ?? error?.message ?? `Could not update your ${LIST_LABELS[listName]}. Try again.`,
                needsLogin: isAuthError,
            });
        } finally {
            setPendingList(null);
        }
    }

    return {
        isFavorited,
        isWatchlisted,
        pendingList,
        toggleFavorite: () => updateList('favorite', isFavorited, setIsFavorited),
        toggleWatchlist: () => updateList('watchlist', isWatchlisted, setIsWatchlisted),
    };
}
