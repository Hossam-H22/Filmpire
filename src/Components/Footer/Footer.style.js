
import { makeStyles } from "@mui/styles";

export default makeStyles((theme)=>({
    container: {
        display: 'flex',
        justifyContent: 'center',
        textDecoration: 'none',
        margin: '20px 0 40px',
    },
    link: {
        textDecoration: 'none',
        color: theme.palette.mode === 'dark'? '#fff !important' : '#000 !important',
    },
}));