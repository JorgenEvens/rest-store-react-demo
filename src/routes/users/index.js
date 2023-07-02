import React from 'react';
import { Outlet } from 'react-router-dom';

import Users from 'pages/users';
import User from 'pages/users/user';
import Projects from 'pages/users/projects';

const route = {
    path: 'users',
    element: <Outlet />,
    children: [{
        path: '',
        element: <Users />
    }, {
        path: ':userId',
        element: <Outlet />,
        children: [{
            path: '',
            element: <User />
        }, {
            path: 'projects',
            element: <Projects />
        }, {
            path: 'projects/:page',
            element: <Projects />
        }]
    }]
}

export default route;
