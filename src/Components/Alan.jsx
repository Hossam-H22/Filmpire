import React, { useContext, useEffect } from 'react'
import alanBtn from '@alan-ai/alan-sdk-web';
import { ColorModeContext } from '../utils/ToggoleColorMode.jsx';
import { fetchToken } from '../utils/index.js';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { selectGenreOrCategory, searchMovie } from '../features/currentGenreOrCategory.js';



export default function useAlan() {
    const { setMode } = useContext(ColorModeContext);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        alanBtn({
            key: process.env.REACT_APP_ALAN_AI_KEY,
            onCommand: ({ command, genres, genreOrCategory, mode, query }) => {
                console.log(command);
                if (command === 'chooseGenre') {
                    const foundGenre = genres?.find((g) => g?.name?.toLowerCase() === genreOrCategory?.toLowerCase());
                    if (foundGenre) {
                        dispatch(selectGenreOrCategory(foundGenre?.id));
                        navigate('/');
                    }
                    else {
                        const categoryName = genreOrCategory?.startsWith('top')? 'top_rated' : genreOrCategory; 
                        dispatch(selectGenreOrCategory(categoryName));
                        navigate('/');
                    }
                }
                else if (command === 'search') {
                    console.log(query);
                    dispatch(searchMovie(query));
                    navigate('/');
                }
                else if (command === 'changeMode') {
                    (mode === 'light')? setMode('light') : setMode('dark');
                }
                else if (command === 'login') {
                    fetchToken();
                }
                else if (command === 'logout') {
                    localStorage.clear();
                    window.location.href = '/';
                }
                
            }
        });

    }, []);

}
