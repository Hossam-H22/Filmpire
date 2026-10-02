import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
    person: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
        textAlign: 'center',
        color: theme.palette.text.primary,
        '&:hover $castImage': {
            borderColor: theme.palette.primary.main,
            transform: 'scale(1.04)',
        },
    },
    castImage: {
        width: 96,
        height: 96,
        objectFit: 'cover',
        borderRadius: '50%',
        border: `2px solid ${theme.palette.divider}`,
        background: theme.palette.raised,
        transition: 'border-color 0.2s, transform 0.2s',
    },
    name: {
        fontSize: 13,
        lineHeight: 1.25,
    },
    role: {
        fontSize: 12,
        lineHeight: 1.25,
        color: theme.palette.text.secondary,
    },
}));
