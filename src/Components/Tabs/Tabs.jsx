import React from 'react';
import useStyles from './Tabs.style.js';

// Underlined text tabs: tabs = [{ label, value }]
export default function Tabs({ tabs, value, onChange, label }) {
    const classes = useStyles();

    return <div className={classes.tabs} role='tablist' aria-label={label}>
        {tabs.map((tab) => (
            <button
                key={tab.value}
                type='button'
                role='tab'
                aria-selected={tab.value === value}
                className={`${classes.tab} ${tab.value === value ? classes.active : ''}`}
                onClick={() => onChange(tab.value)}
            >
                {tab.label}
            </button>
        ))}
    </div>
}
