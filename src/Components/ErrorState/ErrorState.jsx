import { Refresh } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { PageContainer } from './../index.js';
import useStyles from './ErrorState.style.js';

// A request failed (not a missing page): explain it and offer a retry (onRetry) and a way home (homePath)
export default function ErrorState({
    title = 'Something went wrong',
    message = "We couldn't load this from TMDB. Check your connection and try again.",
    onRetry,
    homePath = '/',
}) {
    const classes = useStyles();

    return <PageContainer>
        <div className={classes.box} role='alert'>
            <Typography variant='h5' className={classes.title}>{title}</Typography>
            <Typography color='text.secondary'>{message}</Typography>
            <div className={classes.actions}>
                {onRetry && <Button variant='contained' startIcon={<Refresh />} onClick={onRetry}>Try again</Button>}
                <Button variant='outlined' color='inherit' component={Link} to={homePath}>Go home</Button>
            </div>
        </div>
    </PageContainer>
}
