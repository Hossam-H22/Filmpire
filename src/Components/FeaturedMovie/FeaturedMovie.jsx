import { Star } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { useGetGenresQuery } from '../../services/TMDB.js';
import { IMAGE_BACKDROP_BASE_LINK } from './../../utils/constants.js';
import { PageContainer } from './../index.js';
import useStyles from './FeaturedMovie.style.js';


// movie is a TMDB movie or TV show; mediaType falls back to the item's own media_type (search results)
export default function FeaturedMovie({ movie, eyebrow, mediaType }) {
    const classes = useStyles();
    const type = movie?.media_type ?? mediaType ?? 'movie';
    const { data: genres } = useGetGenresQuery(type);

    if (!movie) return null;

    const title = movie?.title ?? movie?.name;
    const date = movie?.release_date ?? movie?.first_air_date;

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
            <h1 className={classes.title}>{title}</h1>
            <div className={classes.meta}>
                <span className={classes.score}><Star className={classes.star} />{movie?.vote_average?.toFixed(1)}</span>
                <span className={classes.mono}>{movie?.vote_count?.toLocaleString()} votes</span>
                {date && <><span className={classes.dot} /><span>{date.split('-')[0]}</span></>}
                {type === 'tv' && <><span className={classes.dot} /><span>TV series</span></>}
                {genreNames?.length > 0 && <><span className={classes.dot} /><span>{genreNames.join(' · ')}</span></>}
            </div>
            <p className={classes.overview}>{movie?.overview}</p>
            <Button variant='contained' component={Link} to={`/${type}/${movie?.id}`}>
                More info
            </Button>
        </PageContainer>
    </Box>
}
