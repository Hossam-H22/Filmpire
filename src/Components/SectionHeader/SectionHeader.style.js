import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
    header: {
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 16,
        marginBottom: 18,
    },
    title: {
        fontFamily: theme.fonts.display,
        fontWeight: 400,
        fontSize: 34,
        lineHeight: 1,
        letterSpacing: '0.03em',
        textWrap: 'balance',
    },
    aside: {
        fontSize: 13,
        color: theme.palette.text.secondary,
        fontFamily: theme.fonts.mono,
    },
}));
