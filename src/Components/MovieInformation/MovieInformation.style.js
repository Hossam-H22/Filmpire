
import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
    containerSpaceAround: {
        display: 'flex',
        justifyContent: 'space-around',
        margin: '10px 0 !important',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            flexWrap: 'wrap',
        },
    },
    posterContainer: {
        [theme.breakpoints.down('lg')]: {
            display: 'flex !important',
            justifyContent: 'center !important',
            marginBottom: '30px !important',
        },
    },
    poster: {
        borderRadius: '20px',
        boxShadow: '0.5em 1em 1em #404046bf', // rgp(64, 64, 70)
        width: '80%',
        [theme.breakpoints.down('lg')]: {
            margin: '0 auto',
            width: '50%',
            height: 'auto',
        },
        [theme.breakpoints.down('sm')]: {
            margin: '0 auto',
            width: '100%',
            height: '350px',
        },
    },
    genresContainer: {
        margin: '10px 0 !important',
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
    },
    links: {
        textDecoration: 'none',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
            padding: '0.5rem 1rem',
        },
    },
    genereImage: {
        filter: theme.palette.mode === 'dark' && 'invert(1)',
        marginRight: '10px',
    },
    castImage: {
        width: '100%',
        maxWidth: '7em',
        height: '8em',
        objectFit: 'cover',
        borderRadius: '10px',
    },
    buttonsContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
        },
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    videos: {
        width: '50%',
        height: '50%',
        [theme.breakpoints.down('sm')]: {
            width: '90%',
            height: '50%',
        },
    },
}));