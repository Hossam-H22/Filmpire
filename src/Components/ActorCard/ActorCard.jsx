import { Grid, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { IMAGE_BASE_LINK } from './../../utils/constants.js';
import { useStyles } from './ActorCard.style.js';

export default function ActorCard({ character }) {
    const classes = useStyles();
    return (
        <Grid
            item
            xs={4} md={2}
            component={Link}
            to={`/actor/${character?.id}`}
            sx={{
                textDecoration: 'none',
                textAlign: 'center',
                marginBottom: '10px',
            }}
        >
            <img
                className={classes.castImage}
                src={`${IMAGE_BASE_LINK}/${character?.profile_path}`}
                alt={character?.name}
            />
            <Typography color='textPrimary' sx={{ width: '100%' }}>{character?.name}</Typography>
            <Typography color='textSecondary'>{character?.character?.split('/')[0]}</Typography>
        </Grid>
    )
}
