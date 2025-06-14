import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
    Loader: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1000,
    },
}));