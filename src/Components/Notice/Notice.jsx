import { Alert, Button, Snackbar } from '@mui/material';
import React from 'react';
import { fetchToken } from './../../utils/index.js';

// Bottom toast for a notice = { id, severity, message, needsLogin } from showNotice (utils/notify.js).
// Successes leave sooner; a new notice restarts the timer
export default function Notice({ notice, onClose }) {
    return <Snackbar
        key={notice?.id}
        open={Boolean(notice)}
        autoHideDuration={notice?.severity === 'success' ? 3000 : 6000}
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
