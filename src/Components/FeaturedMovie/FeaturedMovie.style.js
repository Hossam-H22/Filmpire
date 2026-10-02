import { alpha } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

// Shared by every page that opens on a full-bleed backdrop (home hero, movie details)
export const heroStyles = (theme) => ({
    hero: {
        position: 'relative',
        overflow: 'hidden',
        isolation: 'isolate',
    },
    backdrop: {
        position: 'absolute',
        inset: 0,
        zIndex: -2,
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
    },
    fade: {
        position: 'absolute',
        inset: 0,
        zIndex: -1,
        background: `linear-gradient(90deg, ${theme.palette.background.default} 0%, ${alpha(theme.palette.background.default, 0.7)} 40%, ${alpha(theme.palette.background.default, 0.15)} 75%),
            linear-gradient(0deg, ${theme.palette.background.default} 0%, transparent 45%)`,
        [theme.breakpoints.down('md')]: {
            background: `linear-gradient(0deg, ${theme.palette.background.default} 10%, ${alpha(theme.palette.background.default, 0.65)} 60%, ${alpha(theme.palette.background.default, 0.35)} 100%)`,
        },
    },
    eyebrow: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        fontFamily: theme.fonts.mono,
        fontSize: 12,
        textTransform: 'uppercase',
        letterSpacing: '0.16em',
        color: theme.palette.primary.main,
        '&::before': {
            content: '""',
            width: 24,
            height: 2,
            background: 'currentColor',
        },
    },
    meta: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: '6px 14px',
        fontSize: 13,
        color: theme.palette.text.secondary,
    },
    dot: {
        width: 3,
        height: 3,
        borderRadius: '50%',
        background: theme.palette.text.secondary,
    },
    score: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        fontWeight: 700,
        color: theme.palette.text.primary,
    },
    star: {
        fontSize: '16px !important',
        color: theme.palette.gold,
    },
    mono: {
        fontFamily: theme.fonts.mono,
        fontVariantNumeric: 'tabular-nums',
    },
});

export default makeStyles((theme) => ({
    ...heroStyles(theme),
    content: {
        paddingTop: 'clamp(56px, 9vw, 120px)',
        paddingBottom: 40,
    },
    title: {
        fontFamily: theme.fonts.display,
        fontWeight: 400,
        fontSize: 'clamp(52px, 10vw, 120px)',
        lineHeight: 0.95,
        letterSpacing: '0.02em',
        maxWidth: '12ch',
        textWrap: 'balance',
        margin: '14px 0 12px',
    },
    overview: {
        maxWidth: '56ch',
        fontSize: 16,
        margin: '18px 0 26px',
        display: '-webkit-box',
        WebkitLineClamp: 4,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
    },
}));
