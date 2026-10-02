import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
        padding: '20px 0 8px',
    },
    chips: {
        display: 'flex',
        gap: 8,
        overflowX: 'auto',
        scrollbarWidth: 'none',
        paddingBottom: 2,
        '&::-webkit-scrollbar': {
            display: 'none',
        },
    },
    chip: {
        flex: 'none',
        '&.MuiChip-outlined': {
            background: theme.palette.background.paper,
        },
    },
}));
