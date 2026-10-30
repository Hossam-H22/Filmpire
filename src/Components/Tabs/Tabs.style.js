import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
    tabs: {
        display: 'flex',
        gap: 22,
        overflowX: 'auto',
        scrollbarWidth: 'none',
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    tab: {
        padding: '10px 0',
        border: 0,
        borderBottom: '2px solid transparent',
        marginBottom: -1,
        background: 'none',
        font: 'inherit',
        fontSize: 15,
        fontWeight: 700,
        whiteSpace: 'nowrap',
        cursor: 'pointer',
        color: theme.palette.text.secondary,
        '&:hover': {
            color: theme.palette.text.primary,
        },
    },
    badge: {
        marginLeft: 8,
        padding: '2px 6px',
        borderRadius: 4,
        border: `1px solid ${theme.palette.divider}`,
        fontSize: 11,
        fontWeight: 600,
        verticalAlign: 'middle',
        color: theme.palette.text.secondary,
    },
    active: {
        color: theme.palette.text.primary,
        borderBottomColor: theme.palette.primary.main,
    },
}));
