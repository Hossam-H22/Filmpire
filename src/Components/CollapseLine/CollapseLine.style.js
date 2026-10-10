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
        '& $title, & $icons': {
            opacity: 0.5,
        },
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 8,
    },
    titleContainer: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '14px 0',
        border: 0,
        background: 'none',
        font: 'inherit',
        textAlign: 'left',
        color: theme.palette.text.primary,
        cursor: 'pointer',
        '&:focus-visible': {
            outline: `2px solid ${theme.palette.primary.main}`,
            outlineOffset: 2,
            borderRadius: 8,
        },
    },
    title: {
        fontFamily: theme.fonts.display,
        fontSize: 28,
        letterSpacing: '0.03em',
        lineHeight: 1,
    },
    badge: {
        marginLeft: 'auto',
        display: 'flex',
        alignItems: 'center',
        paddingBottom: 4,
    },
    icons: {
        color: theme.palette.text.primary,
    },
}));
