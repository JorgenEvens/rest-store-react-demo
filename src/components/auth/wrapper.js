import React, { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default
function AuthWrapper() {
    const token = useSelector(state => state?.auth?.token);
    const navigate = useNavigate();

    useEffect(() => {
        if (!token)
            navigate('/auth/login');
    }, [ token, navigate ]);

    if (!token)
        return null;

    return (
        <Outlet />
    );
}
