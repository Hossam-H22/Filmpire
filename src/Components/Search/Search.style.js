import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
    searchContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        height: 38,
        width: 260,
        margin: 0,
        padding: '0 6px',
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
    iconButton: {
        padding: '5px !important',
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
        // iOS zooms into inputs below 16px
        [theme.breakpoints.down('sm')]: {
            fontSize: '16px !important',
        },
        // The clear button replaces the browser's own
        '& input::-webkit-search-cancel-button': {
            WebkitAppearance: 'none',
        },
    },
}));
