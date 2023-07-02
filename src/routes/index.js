import React from 'react';

import AuthWrapper from 'components/auth/wrapper';

import Auth from './auth';

import Users from './users';
import Projects from './projects';

import Home from 'pages/home';

const Root = {
    path: '',
    element: <Home />,
}

const route = [{
    path: '/',
    element: <AuthWrapper />,
    children: [
        Root,
        Users,
        Projects,
    ]
}, Auth];

export default route;
