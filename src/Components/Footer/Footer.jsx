import React from 'react';
import useStyles from './Footer.style.js';

export default function Footer() {
    const classes = useStyles();

    return <div className={classes.container}>
        Developed By &nbsp;
        <a
            href="https://github.com/Hossam-H22"
            target='_blank'
            rel="noreferrer"
            className={classes.link}
        >
            Eng.Hossam
        </a>
    </div>
}
