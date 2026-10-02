import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
    footer: {
        borderTop: `1px solid ${theme.palette.divider}`,
        marginTop: 40,
        fontSize: 13,
        color: theme.palette.text.secondary,
    },
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 16,
        paddingBlock: 28,
    },
    link: {
        fontWeight: 700,
        color: theme.palette.text.primary,
        '&:hover': {
            color: theme.palette.primary.main,
        },
    },
}));
