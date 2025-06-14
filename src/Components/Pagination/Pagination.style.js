import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '20px',
    },
    button: {
        margin: '30px 2px',
        fontSize: '13px !important',
    },
    pageNumber: {
        margin: '0 20px !important',
        color: theme.palette.text.primary,
    },
}));