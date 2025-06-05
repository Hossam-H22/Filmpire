
import { makeStyles } from "@mui/styles";

const drawerWidth = 240;

export default makeStyles((theme) => ({
    toolbar: {
        height: '60px',
        display: 'flex',
        justifyContent: 'space-between',
        marginLeft: '240px',
        [theme.breakpoints.down('md')]: {
            marginLeft: 0,
            // flexWrap: 'wrap',
        },
        // [theme.breakpoints.down('sm')]: {
        //     height: '80px',
        // },
    },
    menuButton: {
        // marginRight: theme.spacing(2),
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    linkButtom: {
        '&:hover': {
            color: 'white !important',
            textDecoration: 'none',
        }
    },
    drawer: {
        [theme.breakpoints.up('md')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    drawerPaper: {
        width: drawerWidth,
    },
}));