import React, { useEffect } from 'react'
import useStyles from './NotFound.style.js'
import { Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

export default function NotFound({ path, message }) {
    const classes = useStyles();
    const navigate = useNavigate();

    

    useEffect(()=> {
        if(window.location.href.includes('approved')){
            navigate('/');
        }
    }, []);


    return <>
        <h1>NotFound</h1>
        <Box display='flex' justifyContent='center' alignItems='center'>
            { message? <Link to={path? path : '/'} > {message} </Link> : null }
        </Box>
    </>
}
