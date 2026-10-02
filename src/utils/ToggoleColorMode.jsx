import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import React, { createContext, useEffect, useMemo, useState } from 'react';


export const ColorModeContext = createContext();

const MODE_STORAGE_KEY = 'color_mode';

export const FONTS = {
    display: '"Bebas Neue", "Oswald", Impact, "Arial Narrow", sans-serif',
    body: '"Manrope", system-ui, -apple-system, "Segoe UI", sans-serif',
    mono: '"IBM Plex Mono", ui-monospace, Menlo, monospace',
};

const PALETTES = {
    dark: {
        primary: { main: '#ff3b5c', contrastText: '#ffffff' },
        background: { default: '#0c0b10', paper: '#16151d' },
        text: { primary: '#f3f1f6', secondary: '#9d99ad' },
        divider: '#2c2a38',
        raised: '#201e2a',
        gold: '#f5c518',
    },
    light: {
        primary: { main: '#e0244a', contrastText: '#ffffff' },
        background: { default: '#f6f4f8', paper: '#ffffff' },
        text: { primary: '#16141c', secondary: '#625d72' },
        divider: '#dedae6',
        raised: '#eeebf2',
        gold: '#b98a00',
    },
};

function getInitialMode() {
    try {
        return localStorage.getItem(MODE_STORAGE_KEY) === 'light' ? 'light' : 'dark';
    } catch (error) {
        return 'dark';
    }
}

export default function ToggoleColorMode({ children }) {

    const [mode, setMode] = useState(getInitialMode);

    function toggoleColorMode() {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    }

    useEffect(() => {
        try {
            localStorage.setItem(MODE_STORAGE_KEY, mode);
        } catch (error) { }
    }, [mode]);

    const theme = useMemo(() => createTheme({
        palette: {
            mode,
            ...PALETTES[mode],
        },
        fonts: FONTS,
        shape: { borderRadius: 10 },
        typography: {
            fontFamily: FONTS.body,
            button: { textTransform: 'none', fontWeight: 700 },
        },
        components: {
            MuiCssBaseline: {
                styleOverrides: {
                    body: { lineHeight: 1.55 },
                    a: { color: 'inherit', textDecoration: 'none' },
                },
            },
            MuiButton: {
                defaultProps: { disableElevation: true },
                styleOverrides: {
                    root: { borderRadius: 10, height: 44, padding: '0 20px', fontSize: 14 },
                    sizeSmall: { height: 34, padding: '0 14px', fontSize: 13 },
                },
            },
            MuiChip: {
                styleOverrides: {
                    root: { fontWeight: 600, borderRadius: 999 },
                },
            },
            MuiTooltip: {
                styleOverrides: {
                    tooltip: { fontFamily: FONTS.body, fontSize: 12 },
                },
            },
        },
    }), [mode]);


    return <ColorModeContext.Provider value={{ mode, setMode, toggoleColorMode }} >
        <ThemeProvider theme={theme}>
            <CssBaseline enableColorScheme />
            {children}
        </ThemeProvider>
    </ColorModeContext.Provider>
}
