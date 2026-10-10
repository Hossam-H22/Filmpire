import { Skeleton } from '@mui/material';
import React from 'react';
import { PageContainer } from './../index.js';
import useStyles from './Skeletons.style.js';

// Placeholder poster grid, shaped like MovieList
export function GridSkeleton({ count = 12 }) {
    const classes = useStyles();

    return <div className={classes.grid} aria-hidden='true'>
        {Array.from({ length: count }, (_, index) => (
            <div key={index}>
                <Skeleton variant='rounded' className={classes.poster} />
                <Skeleton width='80%' />
                <Skeleton width='30%' />
            </div>
        ))}
    </div>
}

// Placeholder of a home page: hero, filters and a grid
export function BrowseSkeleton() {
    const classes = useStyles();

    return <PageContainer className={classes.page} aria-busy='true' aria-label='Loading'>
        <div className={classes.heroText}>
            <Skeleton width={160} />
            <Skeleton variant='rounded' className={classes.title} />
            <Skeleton width='50%' />
            <Skeleton variant='rounded' width={120} height={40} />
        </div>
        <Skeleton variant='rounded' height={36} className={classes.filters} />
        <GridSkeleton />
    </PageContainer>
}

// Placeholder of a movie, TV show or actor page: poster beside the title block, then text
export function DetailSkeleton() {
    const classes = useStyles();

    return <PageContainer className={classes.page} aria-busy='true' aria-label='Loading'>
        <div className={classes.detail}>
            <Skeleton variant='rounded' className={classes.detailPoster} />
            <div className={classes.heroText}>
                <Skeleton width={180} />
                <Skeleton variant='rounded' className={classes.title} />
                <Skeleton width='60%' />
                <div className={classes.buttons}>
                    {[110, 110, 120].map((width, index) => <Skeleton key={index} variant='rounded' width={width} height={38} />)}
                </div>
            </div>
        </div>
        <div className={classes.lines}>
            <Skeleton width={140} height={36} />
            <Skeleton />
            <Skeleton />
            <Skeleton width='70%' />
        </div>
    </PageContainer>
}
