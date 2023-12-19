import { useAuth } from '../../../auth/hooks/useAuth';
import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRoute = () => {
    const isAuthed = useAuth();
    return isAuthed ? <Outlet /> : <Navigate to={'/auth'} />;
};
