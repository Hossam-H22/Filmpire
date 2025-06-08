import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
    searchContainer: {
        [theme.breakpoints.down('sm')]: {
            display: 'flex',
            justifyContent: 'center',
        },
    },
    input: {
        color: theme.palette.mode === 'light' && 'black',
        filter: theme.palette.mode === 'light' && 'invert(1)',
    },
}));