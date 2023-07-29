import React, { useEffect } from 'react'
import useStyles from './NotFound.style.js'
import { Box, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import notFound_light_img from './../../assests/404 Error_page_not_found_light.svg'
import notFound_dark_img from './../../assests/404 Error_page_not_found_dark.svg'
import { useTheme } from '@mui/material/styles'
import { ArrowBack } from '@mui/icons-material';

export default function NotFound({ path, message }) {
    const classes = useStyles();
    const navigate = useNavigate();
    const theme = useTheme();
    

    useEffect(()=> {
        if(window.location.href.includes('approved')){
            navigate('/');
        }
    }, []);


    return <>
        <Box className={classes.imageContainer}>
            <img 
                src={theme.palette.mode === 'light' ? notFound_light_img : notFound_dark_img }
                alt="Not Found" 
                className={classes.image}
            />
        </Box>
        <Box className={classes.message}>
            { message? <Button component={Link} to={path? path : '/'} className={classes.link} startIcon={<ArrowBack />} > {message} </Button> : null }
        </Box>
    </>
}
