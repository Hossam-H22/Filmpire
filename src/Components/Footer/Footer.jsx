import React from 'react';
import { SYSTEM_NAME } from './../../utils/constants.js';
import { PageContainer } from './../index.js';
import useStyles from './Footer.style.js';

export default function Footer() {
    const classes = useStyles();

    return <footer className={classes.footer}>
        <PageContainer className={classes.container}>
            <span>{SYSTEM_NAME.toUpperCase()} · Data from TMDB</span>
            <span>
                Developed By&nbsp;
                <a
                    href="https://github.com/Hossam-H22"
                    target='_blank'
                    rel="noreferrer"
                    className={classes.link}
                >
                    Eng.Hossam
                </a>
            </span>
        </PageContainer>
    </footer>
}
