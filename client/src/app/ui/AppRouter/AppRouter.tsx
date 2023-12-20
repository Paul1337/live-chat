import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Chat } from '../../../chat';
import { AuthPage } from '../../../auth/ui';
import { PrivateRoute } from '../PrivateRoute/PrivateRoute';

const router = createBrowserRouter([
    {
        path: '/',
        element: <PrivateRoute />,
        children: [
            {
                path: '/chat/:chatId?',
                element: <Chat />,
            },
            {
                path: '/*?',
                element: <Navigate to={'/chat'} />,
            },
        ],
    },
    {
        path: '/auth',
        element: <AuthPage />,
    },
]);

export const AppRouter = () => {
    return <RouterProvider router={router} />;
};
