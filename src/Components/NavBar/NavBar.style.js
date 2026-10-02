import { alpha } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
    appBar: {
        backgroundColor: `${alpha(theme.palette.background.default, 0.72)} !important`,
        backgroundImage: 'none !important',
        color: `${theme.palette.text.primary} !important`,
        backdropFilter: 'blur(14px) saturate(1.4)',
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbar: {
        height: 64,
        display: 'flex',
        alignItems: 'center',
        gap: 24,
        [theme.breakpoints.down('sm')]: {
            gap: 12,
        },
    },
    links: {
        display: 'flex',
        gap: 4,
    },
    link: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 2,
        padding: '8px 12px',
        borderRadius: 8,
        border: 0,
        background: 'none',
        font: 'inherit',
        fontWeight: 600,
        fontSize: 14,
        cursor: 'pointer',
        color: theme.palette.text.secondary,
        '&:hover': {
            color: theme.palette.text.primary,
            background: theme.palette.raised,
        },
    },
    linkActive: {
        color: theme.palette.text.primary,
        background: theme.palette.raised,
    },
    genresMenu: {
        maxHeight: 420,
        minWidth: 200,
        border: `1px solid ${theme.palette.divider}`,
        backgroundImage: 'none !important',
    },
    right: {
        marginLeft: 'auto',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
    },
    iconButton: {
        width: 38,
        height: 38,
        color: `${theme.palette.text.primary} !important`,
        background: `${theme.palette.raised} !important`,
        border: `1px solid ${theme.palette.divider} !important`,
    },
    avatarButton: {
        padding: '0 !important',
    },
    avatar: {
        width: '38px !important',
        height: '38px !important',
    },
    drawerPaper: {
        width: 300,
        maxWidth: '85vw',
        backgroundImage: 'none !important',
    },
}));
