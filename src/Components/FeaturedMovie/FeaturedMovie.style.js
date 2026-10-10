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
        color: theme.palette.accent,
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
    // A fixed height, so the page below doesn't jump as titles with longer or shorter text rotate through
    hero: {
        ...heroStyles(theme).hero,
        display: 'flex',
        height: 480,
        [theme.breakpoints.down('md')]: {
            height: 440,
        },
        '&:hover $backdrop': {
            transform: 'scale(1.03)',
        },
    },
    backdrop: {
        ...heroStyles(theme).backdrop,
        transition: 'transform 0.6s ease',
    },
    // The incoming slide's backdrop and text fade in over the outgoing one
    backdropIn: {
        animation: '$fadeIn 0.7s ease both',
    },
    slide: {
        animation: '$riseIn 0.5s ease both',
    },
    '@keyframes fadeIn': {
        from: { opacity: 0 },
        to: { opacity: 1 },
    },
    '@keyframes riseIn': {
        from: { opacity: 0, transform: 'translateY(8px)' },
        to: { opacity: 1, transform: 'none' },
    },
    '@media (prefers-reduced-motion: reduce)': {
        backdropIn: { animation: 'none' },
        slide: { animation: 'none' },
    },
    // Stretched link: the button's ::after fills the hero, its nearest positioned ancestor
    moreInfo: {
        position: 'static !important',
        // The ripple is off, so keyboard focus needs its own ring
        '&.Mui-focusVisible, &:focus-visible': {
            outline: `2px solid ${theme.palette.primary.main}`,
            outlineOffset: 3,
        },
        '&::after': {
            content: '""',
            position: 'absolute',
            inset: 0,
        },
    },
    // Kept short so the first row of the list shows on a laptop screen.
    // The text sits at the bottom, so the More info button stays put from one title to the next
    content: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        paddingTop: 'clamp(40px, 6vw, 80px)',
        paddingBottom: 28,
    },
    title: {
        fontFamily: theme.fonts.display,
        fontWeight: 400,
        fontSize: 'clamp(44px, 6.5vw, 84px)',
        lineHeight: 0.95,
        letterSpacing: '0.02em',
        maxWidth: '16ch',
        textWrap: 'balance',
        margin: '12px 0 10px',
        // Two lines at most, so a long title can't push the banner past its height
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
    },
    overview: {
        maxWidth: '56ch',
        fontSize: 16,
        margin: '14px 0 22px',
        display: '-webkit-box',
        WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
    },
}));
