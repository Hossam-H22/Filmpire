import alanBtn from '@alan-ai/alan-sdk-web';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ColorModeContext } from '../utils/ToggoleColorMode.jsx';
import { browseUrl } from '../utils/browse.js';
import { fetchToken, logout } from '../utils/index.js';


export default function useAlan() {
    const { setMode } = useContext(ColorModeContext);
    const navigate = useNavigate();

    useEffect(() => {
        alanBtn({
            key: process.env.REACT_APP_ALAN_AI_KEY,
            onCommand: ({ command, genres, genreOrCategory, mode, query }) => {
                console.log(command);
                if (command === 'chooseGenre') {
                    const foundGenre = genres?.find((g) => g?.name?.toLowerCase() === genreOrCategory?.toLowerCase());
                    if (foundGenre) {
                        navigate(browseUrl('movie', { genre: foundGenre?.id }));
                    }
                    else {
                        const categoryName = genreOrCategory?.startsWith('top') ? 'top_rated' : genreOrCategory;
                        navigate(browseUrl('movie', { category: categoryName }));
                    }
                }
                else if (command === 'search') {
                    console.log(query);
                    navigate(browseUrl('movie', { s: query }));
                }
                else if (command === 'changeMode') {
                    (mode === 'light') ? setMode('light') : setMode('dark');
                }
                else if (command === 'login') {
                    fetchToken();
                }
                else if (command === 'logout') {
                    logout();
                }

            }
        });

    }, []);

}
