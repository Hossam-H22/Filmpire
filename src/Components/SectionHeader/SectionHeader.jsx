import React from 'react';
import useStyles from './SectionHeader.style.js';

export default function SectionHeader({ title, children }) {
    const classes = useStyles();

    return <div className={classes.header}>
        <h2 className={classes.title}>{title}</h2>
        {children && <div className={classes.aside}>{children}</div>}
    </div>
}
