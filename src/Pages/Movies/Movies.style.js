import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
    section: {
        paddingTop: 28,
        transition: 'opacity 0.2s',
    },
    searchTypes: {
        marginBottom: 24,
    },
    empty: {
        border: `1px dashed ${theme.palette.divider}`,
        borderRadius: 16,
        padding: '44px 24px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
    },
}));
