
import { makeStyles } from "@mui/styles";

export default makeStyles((theme)=>({
    title: {
        color: theme.palette.text.primary,
        textOverflow: 'ellipsis',
        width: '100% !important',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        marginTop: '20px',
        textAlign: 'center',
    },
    links: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        cursor: 'pointer',
    },
    image: {
        borderRadius: '20px',
        height: '300px',
        transition: 'all 0.2s',
        objectFit: 'cover',
        maxWidth: '100% !important',
        '&:hover': {
            transform: 'scale(1.03)',
        },
    },
}));