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
    menu: {
        minWidth: 200,
        border: `1px solid ${theme.palette.divider}`,
        backgroundImage: 'none !important',
    },
    mobileSearch: {
        paddingBottom: 12,
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
