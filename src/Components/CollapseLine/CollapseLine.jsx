import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Box, Collapse, Grid, IconButton, Tooltip, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import useStyles from './CollapseLine.style.js';

// disabled: header can't be opened and is dimmed; badge: element shown at the right of the header.
// Pass open and onOpenChange to control it from outside; otherwise it keeps its own state.
export default function CollapseLine({ title, tooltipTitle, unmountOnExit, disabled, badge, open, onOpenChange, id, children }) {
    const classes = useStyles();
    const [isOpenState, setIsOpenState] = useState(false);
    const isControlled = open !== undefined;
    const isActorCollapseOpen = isControlled ? open : isOpenState;

    function setIsActorCollapseOpen(change) {
        const next = typeof change === 'function' ? change(isActorCollapseOpen) : change;
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

    return (
        <Grid item container id={id} className={`${classes.container} ${disabled ? classes.disabled : ''}`}>
            <Box
                className={classes.titleContainer}
                aria-disabled={disabled || undefined}
                onClick={() => !disabled && setIsActorCollapseOpen(prev => !prev)}
            >
                <Tooltip title={disabled ? '' : tooltipTitle ?? ''}>
                    <span>
                        <IconButton aria-label="expand row" size="small" disabled={disabled}>
                            {isActorCollapseOpen ? <KeyboardArrowUpIcon className={classes.icons} /> : <KeyboardArrowDownIcon className={classes.icons} />}
                        </IconButton>
                    </span>
                </Tooltip>
                <Typography variant='h5' className={classes.title}> {title} </Typography>
                {badge && <span className={classes.badge}>{badge}</span>}
            </Box>
            <Collapse in={!disabled && isActorCollapseOpen} timeout="auto" sx={{ width: '100%' }} unmountOnExit={unmountOnExit}>
                <Box sx={{ width: '100%', padding: '0 0 15px 0' }}>
                    {children}
                </Box>
            </Collapse>
        </Grid>
    )
}
