import { alpha } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { heroStyles } from './../../Components/FeaturedMovie/FeaturedMovie.style.js';

export default makeStyles((theme) => ({
    ...heroStyles(theme),
    heroContent: {
        display: 'grid',
        gridTemplateColumns: '280px minmax(0, 1fr)',
        alignItems: 'end',
        gap: 44,
        paddingTop: 'clamp(40px, 7vw, 96px)',
        paddingBottom: 40,
        [theme.breakpoints.down('md')]: {
            gridTemplateColumns: '180px minmax(0, 1fr)',
            gap: 24,
        },
        [theme.breakpoints.down('sm')]: {
            gridTemplateColumns: 'minmax(0, 1fr)',
        },
    },
    poster: {
        width: '100%',
        aspectRatio: '2 / 3',
        objectFit: 'cover',
        borderRadius: 12,
        boxShadow: '0 30px 60px -20px rgba(0, 0, 0, 0.9)',
        [theme.breakpoints.down('sm')]: {
            width: 160,
        },
    },
    info: {
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        minWidth: 0,
    },
    title: {
        fontFamily: theme.fonts.display,
        fontWeight: 400,
        fontSize: 'clamp(48px, 8vw, 104px)',
        lineHeight: 0.95,
        letterSpacing: '0.02em',
        textWrap: 'balance',
    },
    tagline: {
        marginTop: -8,
        fontSize: 16,
        fontStyle: 'italic',
        color: theme.palette.text.secondary,
    },
    genres: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 8,
    },
    genreChip: {
        background: `${alpha(theme.palette.background.paper, 0.6)} !important`,
        backdropFilter: 'blur(6px)',
    },
    actions: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 10,
    },
    ghost: {
        color: `${theme.palette.text.primary} !important`,
        background: `${alpha(theme.palette.text.primary, 0.1)} !important`,
        border: `1px solid ${alpha(theme.palette.text.primary, 0.16)} !important`,
        backdropFilter: 'blur(6px)',
        '&:hover': {
            background: `${alpha(theme.palette.text.primary, 0.16)} !important`,
        },
    },
    ghostOn: {
        color: `${theme.palette.primary.main} !important`,
        borderColor: `${theme.palette.primary.main} !important`,
    },
    twoCol: {
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) 340px',
        gap: 40,
        paddingTop: 28,
        [theme.breakpoints.down('md')]: {
            gridTemplateColumns: 'minmax(0, 1fr)',
        },
    },
    main: {
        display: 'flex',
        flexDirection: 'column',
        gap: 36,
        minWidth: 0,
    },
    prose: {
        maxWidth: '65ch',
        fontSize: 16,
    },
    cast: {
        display: 'grid',
        gridAutoFlow: 'column',
        gridAutoColumns: 112,
        gap: 18,
        overflowX: 'auto',
        paddingBottom: 8,
    },
    anchor: {
        scrollMarginTop: 80,
    },
    trailers: {
        display: 'grid',
        gridAutoFlow: 'column',
        gridAutoColumns: 'min(320px, 85%)',
        gap: 16,
        overflowX: 'auto',
        paddingBottom: 8,
    },
    player: {
        display: 'block',
        width: '100%',
        aspectRatio: '16 / 9',
        border: 0,
        borderRadius: 12,
        backgroundColor: 'black',
    },
    movieLoader: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
    },
    aside: {
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
    },
    sideCard: {
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        padding: 18,
        borderRadius: 14,
        background: theme.palette.background.paper,
        border: `1px solid ${theme.palette.divider}`,
        fontSize: 12,
        color: theme.palette.text.secondary,
    },
    sideLabel: {
        fontFamily: theme.fonts.mono,
        fontSize: 11,
        textTransform: 'uppercase',
        letterSpacing: '0.14em',
    },
    rateBar: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
    },
    rateNumber: {
        fontFamily: theme.fonts.display,
        fontSize: 48,
        lineHeight: 1,
        color: theme.palette.text.primary,
    },
    track: {
        flex: 1,
        height: 6,
        borderRadius: 6,
        overflow: 'hidden',
        background: theme.palette.raised,
        '& span': {
            display: 'block',
            height: '100%',
            borderRadius: 6,
            background: theme.palette.gold,
        },
    },
    facts: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
        gap: 1,
        margin: 0,
        overflow: 'hidden',
        borderRadius: 12,
        background: theme.palette.divider,
        border: `1px solid ${theme.palette.divider}`,
        '& div': {
            padding: '14px 16px',
            background: theme.palette.background.paper,
        },
        '& dt': {
            fontFamily: theme.fonts.mono,
            fontSize: 11,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: theme.palette.text.secondary,
        },
        '& dd': {
            margin: '4px 0 0',
            fontWeight: 700,
            fontVariantNumeric: 'tabular-nums',
        },
    },
    recommendations: {
        paddingTop: 48,
    },
}));
