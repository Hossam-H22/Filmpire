import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { IMAGE_BACKDROP_BASE_LINK } from './../../utils/constants.js';
import useStyles from './FeaturedMovie.style.js';


export default function FeaturedMovie({ movie }) {
    const classes = useStyles();

    if (!movie) return null;

    return <Box component={Link} to={`/movie/${movie?.id}`} className={classes.featuredCardContainer} >
        <Card className={classes.card} classes={{ root: classes.cardRoot }} >
            <CardMedia
                media='picture'
                alt={movie?.title}
                image={`${IMAGE_BACKDROP_BASE_LINK}/${movie?.backdrop_path}`}
                title={movie?.title}
                className={classes.cardMedia}
            />
            <Box padding='20px'>
                <CardContent className={classes.cardContent} classes={{ root: classes.cardContentRoot }}>
                    <Typography variant='h5' gutterBottom>{movie?.title}</Typography>
                    <Typography variant='body2' gutterBottom>{movie?.overview}</Typography>
                </CardContent>
            </Box>
        </Card>
    </Box>
}
