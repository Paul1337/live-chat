import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Chat } from '../chat/';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to={'/chat'} />,
    },
    {
        path: '/chat',
        element: <Chat />,
    },
    {
        path: '*',
        element: <div>Error. Page does not exist</div>,
    },
]);

export const AppRouter = () => {
    return <RouterProvider router={router} />;
};
