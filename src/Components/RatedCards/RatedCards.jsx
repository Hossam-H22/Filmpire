import { Box, Typography } from '@mui/material';
import React from 'react';
import { MovieList, Pagination } from './../index.js';
import useStyles from './RatedCards.style.js';

export default function RatedCards({ title, data, page, setPage }) {
    const classes = useStyles();

    return <Box>
        <Typography variant='h5' gutterBottom>{title}</Typography>
        <Box display='flex' flexWrap='wrap' className={classes.container}>
            <MovieList movies={data} />
            {data?.total_pages > 1 && <div className={classes.container}>
                <Pagination curruntPage={page} setPage={setPage} totalPages={data?.total_pages} />
            </div>}
        </Box>
    </Box>
}
