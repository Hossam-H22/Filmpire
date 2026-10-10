import { PlayArrow } from '@mui/icons-material';
import React, { useState } from 'react';
import { YOUTUBE_EMBED_BASE_URL } from './../../utils/constants.js';
import { Loader } from './../index.js';
import useStyles from './TrailerCard.style.js';

const MAX_TRAILERS = 10;

// The YouTube videos of a TMDB videos response worth showing: trailers and teasers first, official before fan-made
export function pickTrailers(videos) {
    const rank = (video) => (['Trailer', 'Teaser'].includes(video?.type) ? 0 : 2) + (video?.official ? 0 : 1);
    return (videos?.results ?? [])
        .filter((video) => video?.site === 'YouTube' && video?.key)
        .sort((a, b) => rank(a) - rank(b))
        .slice(0, MAX_TRAILERS);
}

// A YouTube video: shows its thumbnail and only loads the player once the user presses play
export default function TrailerCard({ video }) {
    const classes = useStyles();
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    return (
        <figure className={classes.card}>
            <div className={classes.frame}>
                {isPlaying ? <>
                    {isLoading && <div className={classes.Loader} >
                        <Loader size='3rem' removeMargin />
                    </div>}
                    <iframe
                        className={classes.iframe}
                        title={video.name}
                        src={`${YOUTUBE_EMBED_BASE_URL}/${video.key}?autoplay=1`}
                        allow='autoplay; encrypted-media; picture-in-picture'
                        allowFullScreen
                        onLoad={() => setIsLoading(false)}
                    />
                </> : <button
                    type='button'
                    className={classes.thumb}
                    style={{ backgroundImage: `url(https://i.ytimg.com/vi/${video.key}/hqdefault.jpg)` }}
                    aria-label={`Play ${video.name}`}
                    onClick={() => setIsPlaying(true)}
                >
                    <span className={classes.play}><PlayArrow /></span>
                </button>}
            </div>
            <figcaption className={classes.caption}>
                <span className={classes.name} title={video.name}>{video.name}</span>
                <span className={`${classes.tag} ${video.official ? classes.official : ''}`}>
                    {video.official ? 'Official' : 'Unofficial'}
                </span>
            </figcaption>
        </figure>
    )
}
