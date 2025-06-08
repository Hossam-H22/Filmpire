import { Box } from '@mui/material';
import React from 'react';
import useStyles from './Layout.style.js';

export default function Layout({ children }) {
  const classes = useStyles();
  return (
    <Box className={classes.content}>
      {children}
    </Box>
  )
}
