import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import routes from 'routes';

import { Provider as ReduxProvider, useSelector } from 'react-redux';
import store from 'store';

import './App.css';

const router = createBrowserRouter(routes);

function App() {
    const storeContent = useSelector(state => state);

    return (
        <React.StrictMode>
            <ReduxProvider store={store}>
                <RouterProvider router={router} />
                <pre>{JSON.stringify(storeContent, null, 2)}</pre>
            </ReduxProvider>
        </React.StrictMode>
    );
}

export default App;
