import { Pagination as MuiPagination } from '@mui/material';
import React from 'react';
import { MAX_TMDB_PAGES } from './../../utils/constants.js';
import useStyles from './Pagination.style.js';


export default function Pagination({ curruntPage, setPage, totalPages }) {
    const classes = useStyles();
    const pageCount = Math.min(totalPages ?? 0, MAX_TMDB_PAGES);

    if (pageCount <= 1) return null;

    return <div className={classes.container}>
        <MuiPagination
            page={curruntPage}
            count={pageCount}
            onChange={(e, page) => setPage(page)}
            shape='rounded'
            siblingCount={1}
            classes={{ ul: classes.list }}
        />
    </div>
}
