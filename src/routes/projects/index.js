import React from 'react';
import { Outlet } from 'react-router-dom';

import Project from 'pages/project';
import Issues from 'pages/project/issues';
import Pulls from 'pages/project/pulls';

const route = {
    path: '/projects/:projectId',
    element: <Outlet />,
    children: [{
        path: '',
        element: <Project />,
    }, {
        path: 'issues',
        element: <Issues />
    }, {
        path: 'pulls',
        element: <Pulls />
    }]
}

export default route;
