import { makeStyles } from '@mui/styles';

export default makeStyles((theme)=>({
    content: {
        paddingTop: '70px',
        width: '100% !important',
        [theme.breakpoints.down('sm')]: {
            paddingTop: '90px',
        },
    },
}));