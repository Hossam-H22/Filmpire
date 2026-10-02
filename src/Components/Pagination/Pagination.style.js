import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
    container: {
        display: 'flex',
        justifyContent: 'center',
        padding: '40px 0 16px',
    },
    list: {
        gap: 4,
        '& .MuiPaginationItem-root': {
            minWidth: 40,
            height: 40,
            borderRadius: 10,
            fontFamily: theme.fonts.mono,
            fontWeight: 500,
            border: `1px solid ${theme.palette.divider}`,
            background: theme.palette.background.paper,
        },
        '& .MuiPaginationItem-ellipsis': {
            border: 0,
            background: 'none',
        },
        '& .MuiPaginationItem-root.Mui-selected': {
            color: theme.palette.background.default,
            background: theme.palette.text.primary,
            borderColor: theme.palette.text.primary,
        },
        '& .MuiPaginationItem-root.Mui-selected:hover': {
            background: theme.palette.text.secondary,
        },
        [theme.breakpoints.down('sm')]: {
            '& .MuiPaginationItem-root': {
                minWidth: 34,
                height: 34,
            },
        },
    },
}));
