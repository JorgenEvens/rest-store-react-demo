import React from 'react';
import { Outlet } from 'react-router-dom';

export default
function Public() {
    return (
        <div>
            <h1>GitHub Demo App</h1>
            <Outlet />
        </div>
    );
}
