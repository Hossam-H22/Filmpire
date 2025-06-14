import { makeStyles } from '@mui/styles';
import { DRAWER_WIDTH } from './../../utils/constants.js';

export default makeStyles((theme) => ({
    toolbar: {
        height: '60px',
        display: 'flex',
        justifyContent: 'space-between',
        marginLeft: '240px',
        [theme.breakpoints.down('md')]: {
            marginLeft: 0,
        },
    },
    menuButton: {
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
            width: DRAWER_WIDTH,
            flexShrink: 0,
        },
    },
    drawerPaper: {
        width: DRAWER_WIDTH,
    },
}));