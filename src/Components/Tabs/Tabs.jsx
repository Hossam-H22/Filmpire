import React, { useRef } from 'react';
import useStyles from './Tabs.style.js';

// Underlined text tabs: tabs = [{ label, value }].
// Only the selected tab is in the Tab order; arrow keys, Home and End move between tabs
export default function Tabs({ tabs, value, onChange, label }) {
    const classes = useStyles();
    const list = useRef(null);
    const selectedIndex = tabs.findIndex((tab) => tab.value === value);
    const focusableIndex = selectedIndex === -1 ? 0 : selectedIndex;

    function handleKeyDown(e, index) {
        const nextIndex = {
            ArrowRight: (index + 1) % tabs.length,
            ArrowLeft: (index - 1 + tabs.length) % tabs.length,
            Home: 0,
            End: tabs.length - 1,
        }[e.key];
        if (nextIndex === undefined) return;

        e.preventDefault();
        list.current?.querySelectorAll('[role="tab"]')[nextIndex]?.focus();
        onChange(tabs[nextIndex].value);
    }

    return <div className={classes.tabs} role='tablist' aria-label={label} ref={list}>
        {tabs.map((tab, index) => (
            <button
                key={tab.value}
                type='button'
                role='tab'
                aria-selected={tab.value === value}
                tabIndex={index === focusableIndex ? 0 : -1}
                className={`${classes.tab} ${tab.value === value ? classes.active : ''}`}
                onClick={() => onChange(tab.value)}
                onKeyDown={(e) => handleKeyDown(e, index)}
            >
                {tab.label}
            </button>
        ))}
    </div>
}
