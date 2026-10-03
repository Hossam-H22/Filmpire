import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { userSelector } from './../features/auth.js';
import { useGetListQuery } from './../services/TMDB.js';
import { API_BASE_URL, API_TMDB_KEY } from './constants.js';

// Favorite and watchlist state of one movie or TV show (mediaType 'movie' | 'tv'), with toggles that save to TMDB.
// notice: the last message to show the user, or null
export default function useSavedLists(mediaType, id) {
    const { user, isAuthenticated, sessionId } = useSelector(userSelector);
    const [isFavorited, setIsFavorited] = useState(false);
    const [isWatchlisted, setIsWatchlisted] = useState(false);
    const [pendingList, setPendingList] = useState(null);
    const [notice, setNotice] = useState(null);
    const listType = mediaType === 'tv' ? 'tv' : 'movies';
    const noun = mediaType === 'tv' ? 'shows' : 'movies';

    const { data: favorites } = useGetListQuery({ listName: `favorite/${listType}`, accountId: user.id, sessionId: sessionId, page: 1 }, { skip: !isAuthenticated });
    const { data: watchlist } = useGetListQuery({ listName: `watchlist/${listType}`, accountId: user.id, sessionId: sessionId, page: 1 }, { skip: !isAuthenticated });

    useEffect(() => {
        setIsFavorited(!!favorites?.results?.find((item) => item?.id === Number(id)));
    }, [favorites, id]);

    useEffect(() => {
        setIsWatchlisted(!!watchlist?.results?.find((item) => item?.id === Number(id)));
    }, [watchlist, id]);

    // listName is 'favorite' or 'watchlist'; the button only changes once TMDB confirms the update
    async function updateList(listName, isInList, setIsInList) {
        if (!isAuthenticated || !sessionId) {
            setNotice({ severity: 'info', message: `Please log in to save ${noun}.`, needsLogin: true });
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
        } catch (error) {
            const isAuthError = error?.response?.status === 401;
            setNotice({
                severity: 'error',
                message: isAuthError
                    ? `Your TMDB login has expired. Log in again to save ${noun}.`
                    : error?.response?.data?.status_message ?? error?.message ?? `Could not update your ${listName}. Try again.`,
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
        notice,
        setNotice,
        toggleFavorite: () => updateList('favorite', isFavorited, setIsFavorited),
        toggleWatchlist: () => updateList('watchlist', isWatchlisted, setIsWatchlisted),
    };
}
