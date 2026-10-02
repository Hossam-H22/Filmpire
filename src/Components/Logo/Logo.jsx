import React from 'react';
import { Link } from 'react-router-dom';
import { SYSTEM_NAME } from './../../utils/constants.js';
import useStyles from './Logo.style.js';

export default function Logo({ onClick }) {
    const classes = useStyles();

    return <Link to='/' className={classes.logo} onClick={onClick} aria-label={`${SYSTEM_NAME} home`}>
        <i className={classes.mark} />
        {SYSTEM_NAME.toUpperCase()}
    </Link>
}
