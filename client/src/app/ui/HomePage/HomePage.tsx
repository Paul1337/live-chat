import { useAuth } from '../../../auth/hooks/useAuth';
import { Navigate } from 'react-router-dom';

export const HomePage = () => {
    const isAuthed = useAuth();

    if (isAuthed) {
        return <Navigate to={'/chat'} />;
    } else {
        return <Navigate to={'/auth'} />;
    }
};
