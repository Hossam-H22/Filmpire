import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
    switch: {
        display: 'inline-flex',
        flex: 'none',
        padding: 3,
        borderRadius: 999,
        background: theme.palette.raised,
        border: `1px solid ${theme.palette.divider}`,
    },
    fullWidth: {
        display: 'flex',
        '& $option': {
            flex: 1,
        },
    },
    option: {
        padding: '6px 12px',
        border: 0,
        borderRadius: 999,
        background: 'none',
        font: 'inherit',
        fontSize: 13,
        fontWeight: 700,
        whiteSpace: 'nowrap',
        cursor: 'pointer',
        color: theme.palette.text.secondary,
        transition: 'background 0.2s, color 0.2s',
        '&:hover': {
            color: theme.palette.text.primary,
        },
    },
    active: {
        color: `${theme.palette.primary.contrastText} !important`,
        background: theme.palette.primary.main,
    },
}));
