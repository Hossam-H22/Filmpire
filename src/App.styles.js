import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        display: 'flex',
        minHeight: '100vh',
    },
}));