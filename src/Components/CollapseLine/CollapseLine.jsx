import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Box, Collapse } from '@mui/material';
import React, { useEffect, useId, useState } from 'react';
import useStyles from './CollapseLine.style.js';

// disabled: header can't be opened and is dimmed; badge: element shown at the right of the header.
// Pass open and onOpenChange to control it from outside; otherwise it keeps its own state.
export default function CollapseLine({ title, unmountOnExit, disabled, badge, open, onOpenChange, id, children }) {
    const classes = useStyles();
    const panelId = useId();
    const [isOpenState, setIsOpenState] = useState(false);
    const isControlled = open !== undefined;
    const isOpen = !disabled && (isControlled ? open : isOpenState);

    function setIsOpen(next) {
        if (!isControlled) setIsOpenState(next);
        onOpenChange?.(next);
    }

    useEffect(() => {
        if (disabled) {
            setIsOpenState(false);
            onOpenChange?.(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [disabled]);

    const Icon = isOpen ? KeyboardArrowUpIcon : KeyboardArrowDownIcon;

    return (
        <div id={id} className={`${classes.container} ${disabled ? classes.disabled : ''}`}>
            <div className={classes.header}>
                <button
                    type='button'
                    className={classes.titleContainer}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    disabled={disabled}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <Icon className={classes.icons} />
                    <span className={classes.title}>{title}</span>
                </button>
                {badge && <span className={classes.badge}>{badge}</span>}
            </div>
            <Collapse id={panelId} in={isOpen} timeout="auto" sx={{ width: '100%' }} unmountOnExit={unmountOnExit}>
                <Box sx={{ width: '100%', padding: '0 0 15px 0' }}>
                    {children}
                </Box>
            </Collapse>
        </div>
    )
}
