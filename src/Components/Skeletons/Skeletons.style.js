import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
    page: {
        paddingTop: 40,
    },
    heroText: {
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        minWidth: 0,
    },
    title: {
        width: 'min(520px, 90%)',
        height: '72px !important',
    },
    filters: {
        margin: '40px 0 28px',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(168px, 1fr))',
        gap: '28px 18px',
        [theme.breakpoints.down('sm')]: {
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            gap: '22px 14px',
        },
    },
    poster: {
        width: '100%',
        height: 'auto !important',
        aspectRatio: '2 / 3',
        borderRadius: '12px !important',
        marginBottom: 8,
    },
    detail: {
        display: 'grid',
        gridTemplateColumns: '280px minmax(0, 1fr)',
        alignItems: 'end',
        gap: 44,
        [theme.breakpoints.down('md')]: {
            gridTemplateColumns: '180px minmax(0, 1fr)',
            gap: 24,
        },
        [theme.breakpoints.down('sm')]: {
            gridTemplateColumns: 'minmax(0, 1fr)',
        },
    },
    detailPoster: {
        width: '100%',
        height: 'auto !important',
        aspectRatio: '2 / 3',
        borderRadius: '12px !important',
        [theme.breakpoints.down('sm')]: {
            width: 160,
        },
    },
    buttons: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: 10,
    },
    lines: {
        maxWidth: '65ch',
        paddingTop: 40,
    },
}));
