import { FC, PropsWithChildren, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export const AuthFormWrapper: FC<PropsWithChildren> = ({ children }) => {
    const isAuthed = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthed) navigate('/chat');
    }, [isAuthed]);

    return <>{children}</>;
};
