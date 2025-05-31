
import { makeStyles } from "@mui/styles";

const drawerWidth = 240;

export default makeStyles((theme) => ({
    toolbar: {
        height: '60px',
        display: 'flex',
        justifyContent: 'space-between',
        marginLeft: '240px',
        [theme.breakpoints.down('sm')]: {
            marginLeft: 0,
            flexWrap: 'wrap',
            height: '80px',
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
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
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    drawerPaper: {
        width: drawerWidth,
    },
}));