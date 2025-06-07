import { Box, Collapse, Grid, IconButton, Tooltip, Typography } from '@mui/material'
import React, { useState } from 'react'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function CollapseLine({ title, children }) {
    const [isActorCollapseOpen, setIsActorCollapseOpen] = useState(false);
    return (
        <Grid item container>
            <Box display='flex' alignItems='center' alignContent='center' gap={1}>
                <Tooltip title={title}>
                    <IconButton aria-label="expand row" size="small" onClick={() => setIsActorCollapseOpen(prev => !prev)}>
                        {isActorCollapseOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </Tooltip>
                <Typography variant='h5' gutterBottom> {title} </Typography>
            </Box>

            <Collapse in={isActorCollapseOpen} timeout="auto" >
                {children}
            </Collapse>
        </Grid>
    )
}
