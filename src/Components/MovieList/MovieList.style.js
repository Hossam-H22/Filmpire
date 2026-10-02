import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(168px, 1fr))',
        gap: '28px 18px',
        [theme.breakpoints.down('sm')]: {
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            gap: '22px 14px',
        },
    },
    rail: {
        display: 'grid',
        gridAutoFlow: 'column',
        gridAutoColumns: 168,
        gap: 18,
        overflowX: 'auto',
        paddingTop: 8,
        paddingBottom: 12,
        [theme.breakpoints.down('sm')]: {
            gridAutoColumns: 140,
        },
    },
}));
