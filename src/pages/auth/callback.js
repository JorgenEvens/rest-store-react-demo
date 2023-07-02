import { useSearchParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import React, { useEffect } from 'react';

import { useAuth, exchangeCode } from 'store/auth';

export default
function AuthCallback() {
    const [ query ] = useSearchParams();
    const { token, target } = useAuth();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const code = query.get('code');
    const state = query.get('state');

    useEffect(() => {
        if (code)
            dispatch(exchangeCode({ code, state }));
    }, [ code, state, dispatch ]);

    useEffect(() => {
        if (!token)
            return;

        if (target) {
            navigate(target);
            return;
        }

        navigate('/');
    }, [ token, target, navigate ]);

    if (!code)
        return null;

    return (
        <div>
            <strong>Authorization Code: </strong>
            <span>{code}</span>
        </div>
    );
}
