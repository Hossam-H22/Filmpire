import React from 'react';
import { Link } from 'react-router-dom';
import { IMAGE_BASE_LINK } from './../../utils/constants.js';
import { useStyles } from './ActorCard.style.js';

export default function ActorCard({ character }) {
    const classes = useStyles();
    return (
        <Link to={`/actor/${character?.id}`} className={classes.person}>
            <img
                className={classes.castImage}
                src={`${IMAGE_BASE_LINK}/${character?.profile_path}`}
                alt={character?.name}
                loading='lazy'
            />
            <b className={classes.name}>{character?.name}</b>
            <small className={classes.role}>{character?.character?.split('/')[0]}</small>
        </Link>
    )
}
