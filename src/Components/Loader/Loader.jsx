import { Box, CircularProgress } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React from 'react';

export default function Loader({ size, removeMargin }) {
    const theme = useTheme();

    return <Box display='flex' justifyContent='center' mt={removeMargin ? 0 : 2} >
        <CircularProgress size={size ?? '2rem'} sx={{ color: theme.palette.mode === 'dark' ? '#fff' : theme.palette.primary }} />
    </Box>
}
