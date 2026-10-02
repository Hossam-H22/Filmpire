import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
    logo: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        fontFamily: theme.fonts.display,
        fontSize: 30,
        letterSpacing: '0.06em',
        lineHeight: 1,
        color: theme.palette.text.primary,
        whiteSpace: 'nowrap',
    },
    mark: {
        display: 'inline-block',
        width: 12,
        height: 22,
        borderRadius: 2,
        background: theme.palette.primary.main,
        transform: 'skewX(-12deg)',
    },
}));
