import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
    searchContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        height: 38,
        width: 260,
        padding: '0 14px',
        borderRadius: 999,
        background: theme.palette.raised,
        border: `1px solid ${theme.palette.divider}`,
        cursor: 'text',
        transition: 'border-color 0.2s',
        '&:focus-within': {
            borderColor: theme.palette.primary.main,
        },
    },
    fullWidth: {
        width: '100%',
    },
    icon: {
        fontSize: '18px !important',
        color: theme.palette.text.secondary,
    },
    input: {
        flex: 1,
        minWidth: 0,
        fontSize: '14px !important',
        color: `${theme.palette.text.primary} !important`,
    },
}));
