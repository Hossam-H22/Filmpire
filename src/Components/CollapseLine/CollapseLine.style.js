import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
    container: {
        width: '100%',
        borderRadius: '10px',
        border: '1px solid rgba(0, 0, 0, 0.4)',
        borderColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.4)',
    },
    titleContainer: {
        display: 'flex',
        alignItems: 'center',
        alignContent: 'center',
        gap: 1,
        padding: '10px 15px',
        cursor: 'pointer',
        width: '100%',
        transition: 'all 0.3s ease-in-out',
        borderRadius: '10px',
    },
    icons: {
        color: theme.palette.mode === 'dark' ? 'white' : 'black',
        cursor: 'pointer',
    },
}));