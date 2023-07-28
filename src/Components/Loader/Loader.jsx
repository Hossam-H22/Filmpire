import React from 'react'
import useStyles from './Loader.style.js'
import { Box, CircularProgress } from '@mui/material';

export default function Loader({ size }) {
    const classes = useStyles();

    return <>
        <Box display='flex' justifyContent='center' >
            <CircularProgress size={size? size: '2rem'} />
        </Box>
    </>
}
