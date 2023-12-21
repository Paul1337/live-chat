import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Chat } from '../../../chat';
import { AuthPage } from '../../../auth/ui';
import { PrivateRoute } from '../PrivateRoute/PrivateRoute';
import { RegForm } from '../../../auth/ui/RegForm/RegForm';
import { LoginForm } from '../../../auth/ui/LoginForm/LoginForm';

const router = createBrowserRouter([
    {
        path: '/',
        element: <PrivateRoute />,
        children: [
            {
                path: 'chat/:chatId?',
                element: <Chat />,
            },
            {
                path: '*?',
                element: <Navigate to={'/chat'} />,
            },
        ],
    },
    {
        path: '/auth',
        children: [
            {
                path: 'reg',
                element: <RegForm />,
            },
            {
                path: 'login',
                element: <LoginForm />,
            },
        ],
    },
]);

export const AppRouter = () => {
    return <RouterProvider router={router} />;
};
