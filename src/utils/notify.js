import { useEffect, useState } from 'react';

const NOTICE_EVENT = 'filmpire:notice';

// Shows a toast from anywhere, even outside React: notice = { severity, message, needsLogin }
export function showNotice(notice) {
    window.dispatchEvent(new CustomEvent(NOTICE_EVENT, { detail: { ...notice, id: Date.now() } }));
}

// The notice to show and its setter, for the one <Notice> rendered by App
export function useGlobalNotice() {
    const [notice, setNotice] = useState(null);

    useEffect(() => {
        const onNotice = (event) => setNotice(event.detail);
        window.addEventListener(NOTICE_EVENT, onNotice);
        return () => window.removeEventListener(NOTICE_EVENT, onNotice);
    }, []);

    return [notice, setNotice];
}
