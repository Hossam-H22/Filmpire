import { alpha } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

// Additions to the movie details styles for TV shows
export default makeStyles((theme) => ({
    status: {
        padding: '2px 8px',
        borderRadius: 6,
        border: '1px solid currentColor',
        fontFamily: theme.fonts.mono,
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
    },
    statusLive: {
        color: theme.palette.success.main,
    },
    watchBody: {
        display: 'flex',
        flexDirection: 'column',
        gap: 18,
    },
    picker: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 12,
        paddingTop: 6,
    },
    select: {
        minWidth: 150,
    },
    episodeSelect: {
        flex: '1 1 260px',
        maxWidth: 420,
    },
    watchFooter: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 10,
    },
    nowPlaying: {
        flex: '1 1 160px',
        minWidth: 0,
        textAlign: 'center',
        fontSize: 13,
        color: theme.palette.text.secondary,
        '& b': {
            fontFamily: theme.fonts.mono,
            color: theme.palette.text.primary,
        },
    },
    nextCard: {
        gap: '8px !important',
        borderColor: `${alpha(theme.palette.success.main, 0.45)} !important`,
    },
    nextLabel: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        color: theme.palette.success.main,
    },
    nextTitle: {
        fontFamily: theme.fonts.display,
        fontWeight: 400,
        fontSize: 26,
        lineHeight: 1.05,
        letterSpacing: '0.03em',
        color: theme.palette.text.primary,
    },
    nextDate: {
        fontFamily: theme.fonts.mono,
        fontSize: 13,
        color: theme.palette.success.main,
    },
}));
