import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        padding: 20,
    },
    section: {
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
    },
    label: {
        fontFamily: theme.fonts.mono,
        fontSize: 11,
        textTransform: 'uppercase',
        letterSpacing: '0.14em',
        color: theme.palette.text.secondary,
        marginBottom: 6,
    },
    category: {
        padding: '10px 12px',
        borderRadius: 8,
        fontWeight: 600,
        color: theme.palette.text.secondary,
        '&:hover': {
            color: theme.palette.text.primary,
            background: theme.palette.raised,
        },
    },
    categoryActive: {
        color: theme.palette.text.primary,
        background: theme.palette.raised,
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 8,
    },
}));
