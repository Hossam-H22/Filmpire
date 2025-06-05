
import { makeStyles } from "@mui/styles";

export default makeStyles((theme)=>({
    title: {
        color: theme.palette.text.primary,
        textOverflow: 'ellipsis',
        width: '230px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        marginTop: '20px',
        textAlign: 'center',
    },
    links: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
    },
    image: {
        borderRadius: '20px',
        height: '300px',
        transition: 'all 0.2s',
        '&:hover': {
            transform: 'scale(1.03)',
        },
    },
}));