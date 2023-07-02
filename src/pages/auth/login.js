import qs from 'qs';
import React from 'react';

import { useAuth } from 'store/auth';

const AUTHORIZE_URL = 'https://github.com/login/oauth/authorize?';

export default
function AuthLogin() {
    const { state } = useAuth();

    const authorizationUri = AUTHORIZE_URL + qs.stringify({
        client_id: process.env.REACT_APP_CLIENT_ID,
        redirect_uri: 'http://localhost:3000/auth/callback',
        state
    });

    return (
        <a href={authorizationUri}>
            Connect to GitHub
        </a>
    );
}
