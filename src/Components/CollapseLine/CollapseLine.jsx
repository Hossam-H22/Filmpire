import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Box, Collapse, Grid, IconButton, Tooltip, Typography } from '@mui/material';
import React, { useState } from 'react';
import useStyles from './CollapseLine.style.js';

export default function CollapseLine({ title, tooltipTitle, unmountOnExit, children }) {
    const classes = useStyles();
    const [isActorCollapseOpen, setIsActorCollapseOpen] = useState(false);
    return (
        <Grid item container className={classes.container}>
            <Box
                className={classes.titleContainer}
                onClick={() => setIsActorCollapseOpen(prev => !prev)}
            >
                <Tooltip title={tooltipTitle}>
                    <IconButton aria-label="expand row" size="small">
                        {isActorCollapseOpen ? <KeyboardArrowUpIcon className={classes.icons} /> : <KeyboardArrowDownIcon className={classes.icons} />}
                    </IconButton>
                </Tooltip>
                <Typography variant='h5'> {title} </Typography>
            </Box>
            <Collapse in={isActorCollapseOpen} timeout="auto" sx={{ width: '100%' }} unmountOnExit={unmountOnExit}>
                <Box sx={{ width: '100%', padding: '0 0 15px 0' }}>
                    {children}
                </Box>
            </Collapse>
        </Grid>
    )
}
