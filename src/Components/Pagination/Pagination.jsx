import { Pagination as MuiPagination } from '@mui/material';
import React from 'react';
import { MAX_TMDB_PAGES } from './../../utils/constants.js';
import useStyles from './Pagination.style.js';


// scrollTarget: optional ref of the list, brought back into view when the page changes
export default function Pagination({ curruntPage, setPage, totalPages, scrollTarget }) {
    const classes = useStyles();
    const pageCount = Math.min(totalPages ?? 0, MAX_TMDB_PAGES);

    if (pageCount <= 1) return null;

    function changePage(page) {
        setPage(page);
        scrollTarget?.current?.scrollIntoView({ block: 'start' });
    }

    return <nav className={classes.container} aria-label='Pagination'>
        <MuiPagination
            page={curruntPage}
            count={pageCount}
            onChange={(e, page) => changePage(page)}
            shape='rounded'
            siblingCount={1}
            classes={{ ul: classes.list }}
        />
    </nav>
}
