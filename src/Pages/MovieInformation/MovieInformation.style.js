import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
    containerSpaceAround: {
        color: theme.palette.text.primary,
        display: 'flex',
        justifyContent: 'space-around',
        margin: '10px 0 !important',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            flexWrap: 'wrap',
        },
    },
    posterContainer: {
        textAlign: 'center',
        position: 'relative',
        [theme.breakpoints.down('lg')]: {
            display: 'flex !important',
            justifyContent: 'center !important',
            marginBottom: '30px !important',
        },
    },
    poster: {
        borderRadius: '20px',
        boxShadow: '0.4em 0.5em 1em rgba(64, 64, 70, 0.57)', // rgp(64, 64, 70)
        width: '100%',
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
    posterButtons: {
        position: 'absolute',
        bottom: '5px',
        right: '50%',
        transform: 'translateX(50%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '15px',
        zIndex: 1000,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        borderRadius: '25px',
        padding: '2px 10px',
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
    movieLoader: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
    },
}));