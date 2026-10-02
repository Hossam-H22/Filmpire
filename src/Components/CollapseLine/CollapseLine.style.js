import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
    container: {
        width: '100%',
        borderRadius: 14,
        border: `1px solid ${theme.palette.divider}`,
        background: theme.palette.background.paper,
        padding: '0 16px',
    },
    disabled: {
        '& $titleContainer': {
            cursor: 'not-allowed',
        },
        '& $title': {
            opacity: 0.5,
        },
    },
    titleContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '14px 0',
        cursor: 'pointer',
        width: '100%',
        '& h5': {
            fontFamily: theme.fonts.display,
            fontSize: 28,
            letterSpacing: '0.03em',
            lineHeight: 1,
        },
    },
    title: {},
    badge: {
        marginLeft: 'auto',
        display: 'flex',
        alignItems: 'center',
    },
    icons: {
        color: theme.palette.text.primary,
        cursor: 'pointer',
    },
}));
