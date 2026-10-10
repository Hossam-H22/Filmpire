import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
    box: {
        margin: '56px 0',
        border: `1px dashed ${theme.palette.divider}`,
        borderRadius: 16,
        padding: '44px 24px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
    },
    title: {
        fontWeight: '700 !important',
    },
    actions: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 10,
        marginTop: 14,
    },
}));
