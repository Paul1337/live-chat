import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Chat } from '../../../chat';
import { AuthPage } from '../../../auth/ui';
import { PrivateRoute } from '../PrivateRoute/PrivateRoute';

const router = createBrowserRouter([
    {
        path: '/',
        element: <PrivateRoute />,
        children: [
            {
                path: '/chat',
                element: <Chat />,
            },
            {
                path: '/chat/:chatId',
                element: <Chat />,
            },
        ],
    },
    {
        path: '/auth',
        element: <AuthPage />,
    },
    {
        path: '*',
        element: <div>Error. Page does not exist</div>,
    },
]);

export const AppRouter = () => {
    return <RouterProvider router={router} />;
};
