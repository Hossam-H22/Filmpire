import { alpha } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { heroStyles } from './../../Components/FeaturedMovie/FeaturedMovie.style.js';

export default makeStyles((theme) => ({
    eyebrow: heroStyles(theme).eyebrow,
    header: {
        background: `radial-gradient(ellipse 60% 120% at 0% 0%, ${alpha(theme.palette.primary.main, 0.22)}, transparent 70%), ${theme.palette.background.paper}`,
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    headerContent: {
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 22,
        paddingBlock: 40,
    },
    avatar: {
        width: '88px !important',
        height: '88px !important',
    },
    name: {
        fontFamily: theme.fonts.display,
        fontWeight: 400,
        fontSize: 54,
        lineHeight: 1,
        letterSpacing: '0.02em',
        marginTop: 8,
    },
    stats: {
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 28,
        marginLeft: 'auto',
        '& div': {
            display: 'flex',
            flexDirection: 'column',
        },
        '& b': {
            fontFamily: theme.fonts.display,
            fontWeight: 400,
            fontSize: 38,
            lineHeight: 1,
        },
        '& span': {
            fontSize: 12,
            color: theme.palette.text.secondary,
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: 0,
        },
    },
    tabs: {
        padding: '20px 0 28px',
    },
    empty: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 10,
        padding: '44px 24px',
        textAlign: 'center',
        borderRadius: 16,
        border: `1px dashed ${theme.palette.divider}`,
    },
    reel: {
        position: 'relative',
        width: 64,
        height: 64,
        borderRadius: '50%',
        border: `6px solid ${theme.palette.raised}`,
        '&::after': {
            content: '""',
            position: 'absolute',
            inset: 14,
            borderRadius: '50%',
            background: theme.palette.primary.main,
        },
    },
    emptyTitle: {
        fontFamily: `${theme.fonts.display} !important`,
        letterSpacing: '0.03em',
    },
}));
