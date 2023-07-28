import React from 'react'
import useStyles from './RatedCards.style.js'
import { Box, Typography } from '@mui/material';
import { MovieList } from './../index.js'

export default function RatedCards({ title, data }) {
    const classes = useStyles();

    return <>
        <Box>
            <Typography variant='h5' gutterBottom>{title}</Typography>
            <Box display='flex' flexWrap='wrap' className={classes.container}>
                <MovieList movies={data}  />
            </Box>
        </Box>
    </>
}
