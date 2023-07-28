
import { makeStyles } from '@mui/styles';

export default makeStyles(()=>({
    root: {
        display: 'flex',
        hight: '100%',
    },
    toolbar: {
        height: '70px',
    },
    content: {
        flexGrow: '1',
        padding: '1.5em',
        width: '100% !important',
    },
}));