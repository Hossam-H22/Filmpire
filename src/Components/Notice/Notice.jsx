import { Alert, Button, Snackbar } from '@mui/material';
import React from 'react';
import { fetchToken } from './../../utils/index.js';

// Bottom toast for a notice = { severity, message, needsLogin } from useSavedLists
export default function Notice({ notice, onClose }) {
    return <Snackbar
        open={Boolean(notice)}
        autoHideDuration={6000}
        onClose={(e, reason) => reason !== 'clickaway' && onClose()}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
        {notice ? <Alert
            severity={notice.severity}
            variant='filled'
            onClose={onClose}
            action={notice.needsLogin && <Button color='inherit' size='small' onClick={fetchToken}>Log in</Button>}
        >
            {notice.message}
        </Alert> : <span />}
    </Snackbar>
}
