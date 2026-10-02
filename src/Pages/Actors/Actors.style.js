import { makeStyles } from "@mui/styles";
import { heroStyles } from './../../Components/FeaturedMovie/FeaturedMovie.style.js';

export default makeStyles((theme) => ({
    eyebrow: heroStyles(theme).eyebrow,
    top: {
        display: 'grid',
        gridTemplateColumns: '300px minmax(0, 1fr)',
        alignItems: 'start',
        gap: 48,
        paddingTop: 48,
        [theme.breakpoints.down('md')]: {
            gridTemplateColumns: '200px minmax(0, 1fr)',
            gap: 28,
        },
        [theme.breakpoints.down('sm')]: {
            gridTemplateColumns: 'minmax(0, 1fr)',
            paddingTop: 28,
        },
    },
    image: {
        width: '100%',
        aspectRatio: '4 / 5',
        objectFit: 'cover',
        borderRadius: 16,
        background: theme.palette.raised,
        boxShadow: '0 18px 40px -18px rgba(0, 0, 0, 0.6)',
        [theme.breakpoints.down('sm')]: {
            width: 180,
        },
    },
    details: {
        minWidth: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    name: {
        fontFamily: theme.fonts.display,
        fontWeight: 400,
        fontSize: 'clamp(48px, 7vw, 92px)',
        lineHeight: 0.95,
        letterSpacing: '0.02em',
        textWrap: 'balance',
        margin: '12px 0 4px',
    },
    kv: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px 28px',
        margin: '14px 0 20px',
        '& div': {
            display: 'flex',
            flexDirection: 'column',
        },
        '& span': {
            fontFamily: theme.fonts.mono,
            fontSize: 11,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: theme.palette.text.secondary,
        },
    },
    bio: {
        maxWidth: '65ch',
        fontSize: 16,
        whiteSpace: 'pre-line',
    },
    bioClamped: {
        display: '-webkit-box',
        WebkitLineClamp: 8,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
    },
    readMore: {
        marginTop: 8,
        padding: 0,
        border: 0,
        background: 'none',
        font: 'inherit',
        fontWeight: 700,
        cursor: 'pointer',
        color: theme.palette.primary.main,
    },
    actions: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 10,
        marginTop: 24,
    },
}));
