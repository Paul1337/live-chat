import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { chatConfig } from '../chat/config';
import { Chat } from '../chat/';

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <div className='border m-3 bg-slate-300 rounded-md text-center p-4 font-bold border-solid'>
                test
            </div>
        ),
    },
    {
        path: chatConfig.route,
        element: <Chat />,
    },
    {
        path: '/test',
        element: <div>test</div>,
    },
    {
        path: '*',
        element: <div>Error. Page does not exist</div>,
    },
]);

export const AppRouter = () => {
    return <RouterProvider router={router} />;
};
