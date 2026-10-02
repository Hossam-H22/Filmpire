import { Box } from '@mui/material';
import React from 'react';

export default function PageContainer({ children, sx, ...props }) {
    return <Box
        sx={{ maxWidth: 1280, mx: 'auto', px: { xs: 2, sm: 3, md: 5 }, width: '100%', ...sx }}
        {...props}
    >
        {children}
    </Box>
}
