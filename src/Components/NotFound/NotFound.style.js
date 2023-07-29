
import { makeStyles } from "@mui/styles";

export default makeStyles((theme)=>({
    imageContainer: {
        display: 'flex',
        justifyContent: 'center',
        padding: '30px 0',
    },
    image: {
        [theme.breakpoints.up('lg')]: {
            width: '40%',
        },
        [theme.breakpoints.down('lg')]: {
            width: '65%',
        },
        [theme.breakpoints.down('md')]: {
            width: '100%',
        },
    },
    message: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    link: {
        color: theme.palette.mode === 'dark'? '#fff !important' : '#000 !important',
    },
}));