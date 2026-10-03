import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Loader } from './../../Components/index.js';
import { clearUser, setUser, startLogin } from './../../features/auth.js';
import { clearAuth, createSessionId, fetchAccount, takeLoginReturnPath } from './../../utils/index.js';

// TMDB redirects here after the user approves (approved=true) or denies (denied=true) the login
export default function Approved() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const started = useRef(false);

    useEffect(() => {
        // A request token can only be exchanged once
        if (started.current) return;
        started.current = true;

        const finishLogin = async () => {
            const returnPath = takeLoginReturnPath();
            const requestToken = searchParams.get('request_token');
            if (searchParams.get('approved') !== 'true' || !requestToken) {
                clearAuth();
                navigate(returnPath, { replace: true });
                return;
            }

            dispatch(startLogin());
            try {
                const sessionId = await createSessionId(requestToken);
                const user = await fetchAccount(sessionId);
                dispatch(setUser({ user, sessionId }));
            } catch (error) {
                console.log(error);
                clearAuth();
                dispatch(clearUser());
            }
            navigate(returnPath, { replace: true });
        }
        finishLogin();
    }, [dispatch, navigate, searchParams]);

    return <Loader size='8rem' />
}
