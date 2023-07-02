import React from 'react';
import PublicPage from 'pages/public';
import LoginPage from 'pages/auth/login';
import CallbackPage from 'pages/auth/callback';

const route = {
    path: '/auth',
    element: <PublicPage />,
    children: [{
        path: 'login',
        element: <LoginPage />
    }, {
        path: 'callback',
        element: <CallbackPage />
    }]
}

export default route;
