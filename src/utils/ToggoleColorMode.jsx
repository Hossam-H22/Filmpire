import React, { createContext, useMemo, useState } from 'react'
import { ThemeProvider, createTheme } from '@mui/material';


export const ColorModeContext = createContext();

export default function ToggoleColorMode({ children }) {

    const [mode, setMode] = useState('light')

    function toggoleColorMode() {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    }

    const theme = useMemo(() => createTheme({
        palette: {
            mode,
        },
    }), [mode]);


    return <>
        <ColorModeContext.Provider value={{ mode, setMode, toggoleColorMode }} >
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    </>
}
