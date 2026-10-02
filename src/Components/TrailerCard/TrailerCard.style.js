import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
    card: {
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        margin: 0,
        minWidth: 0,
    },
    frame: {
        position: 'relative',
        aspectRatio: '16 / 9',
        borderRadius: 12,
        overflow: 'hidden',
        background: theme.palette.raised,
    },
    iframe: {
        width: '100%',
        height: '100%',
        border: 0,
    },
    Loader: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1,
    },
    caption: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 10,
        fontSize: 13,
    },
    name: {
        fontWeight: 600,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    tag: {
        flex: 'none',
        padding: '1px 8px',
        borderRadius: 999,
        fontFamily: theme.fonts.mono,
        fontSize: 11,
        border: `1px solid ${theme.palette.divider}`,
        color: theme.palette.text.secondary,
    },
    official: {
        color: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
    },
}));
