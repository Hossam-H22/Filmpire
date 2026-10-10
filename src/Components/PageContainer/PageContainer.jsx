import { Box } from '@mui/material';
import React, { forwardRef } from 'react';

export default forwardRef(function PageContainer({ children, sx, ...props }, ref) {
    return <Box
        ref={ref}
        sx={{ maxWidth: 1280, mx: 'auto', px: { xs: 2, sm: 3, md: 5 }, width: '100%', ...sx }}
        {...props}
    >
        {children}
    </Box>
});
