import React, { useState } from 'react';
import { YOUTUBE_EMBED_BASE_URL } from './../../utils/constants.js';
import { Loader } from './../index.js';
import useStyles from './TrailerCard.style.js';

export default function TrailerCard({ video }) {
    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(true);

    return (
        <figure className={classes.card}>
            <div className={classes.frame}>
                {isLoading && <div className={classes.Loader} >
                    <Loader size='3rem' removeMargin />
                </div>}
                <iframe
                    className={classes.iframe}
                    title={video.name}
                    src={`${YOUTUBE_EMBED_BASE_URL}/${video.key}`}
                    allow='autoplay'
                    allowFullScreen
                    loading='lazy'
                    onLoad={() => setIsLoading(false)}
                />
            </div>
            <figcaption className={classes.caption}>
                <span className={classes.name}>{video.name}</span>
                <span className={`${classes.tag} ${video.official ? classes.official : ''}`}>
                    {video.official ? 'Official' : 'Unofficial'}
                </span>
            </figcaption>
        </figure>
    )
}
