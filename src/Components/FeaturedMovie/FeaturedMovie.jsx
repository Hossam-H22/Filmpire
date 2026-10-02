import { Star } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { useGetGenresQuery } from '../../services/TMDB.js';
import { IMAGE_BACKDROP_BASE_LINK } from './../../utils/constants.js';
import { PageContainer } from './../index.js';
import useStyles from './FeaturedMovie.style.js';


export default function FeaturedMovie({ movie, eyebrow }) {
    const classes = useStyles();
    const { data: genres } = useGetGenresQuery();

    if (!movie) return null;

    const genreNames = movie?.genre_ids
        ?.map((genreId) => genres?.genres?.find(({ id }) => id === genreId)?.name)
        .filter(Boolean)
        .slice(0, 3);

    return <Box component='section' className={classes.hero}>
        {movie?.backdrop_path && <div
            className={classes.backdrop}
            style={{ backgroundImage: `url(${IMAGE_BACKDROP_BASE_LINK}/${movie?.backdrop_path})` }}
        />}
        <div className={classes.fade} />
        <PageContainer className={classes.content}>
            <div className={classes.eyebrow}>{eyebrow ?? 'Featured'}</div>
            <h1 className={classes.title}>{movie?.title}</h1>
            <div className={classes.meta}>
                <span className={classes.score}><Star className={classes.star} />{movie?.vote_average?.toFixed(1)}</span>
                <span className={classes.mono}>{movie?.vote_count?.toLocaleString()} votes</span>
                {movie?.release_date && <><span className={classes.dot} /><span>{movie.release_date.split('-')[0]}</span></>}
                {genreNames?.length > 0 && <><span className={classes.dot} /><span>{genreNames.join(' · ')}</span></>}
            </div>
            <p className={classes.overview}>{movie?.overview}</p>
            <Button variant='contained' component={Link} to={`/movie/${movie?.id}`}>
                More info
            </Button>
        </PageContainer>
    </Box>
}
