import { alpha } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
        padding: '20px 0 8px',
    },
    rowWrapper: {
        position: 'relative',
    },
    chips: {
        display: 'flex',
        gap: 8,
        overflowX: 'auto',
        scrollbarWidth: 'none',
        paddingBottom: 2,
        '&::-webkit-scrollbar': {
            display: 'none',
        },
    },
    chip: {
        flex: 'none',
        '&.MuiChip-outlined': {
            background: theme.palette.background.paper,
        },
    },
    // Fade over the cut-off end of the row, holding its scroll arrow
    edge: {
        position: 'absolute',
        top: 0,
        bottom: 2,
        zIndex: 1,
        display: 'flex',
        alignItems: 'center',
        width: 72,
        pointerEvents: 'none',
    },
    edgeLeft: {
        left: 0,
        justifyContent: 'flex-start',
        background: `linear-gradient(90deg, ${theme.palette.background.default} 40%, ${alpha(theme.palette.background.default, 0)})`,
    },
    edgeRight: {
        right: 0,
        justifyContent: 'flex-end',
        background: `linear-gradient(270deg, ${theme.palette.background.default} 40%, ${alpha(theme.palette.background.default, 0)})`,
    },
    arrow: {
        pointerEvents: 'auto',
        color: `${theme.palette.text.primary} !important`,
        background: `${theme.palette.raised} !important`,
        border: `1px solid ${theme.palette.divider} !important`,
    },
}));
