import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { LoginForm } from './LoginForm/LoginForm';
import { RegForm } from './RegForm/RegForm';

enum AuthType {
    Login = 'Log in',
    Reg = 'Register',
}

export const AuthPage = () => {
    const navigate = useNavigate();
    const isAuthed = useAuth();
    const [authType, setAuthType] = useState(AuthType.Login);

    if (isAuthed) navigate('/chat');

    const handleToggleAuthType = () => {
        setAuthType(type => (type === AuthType.Login ? AuthType.Reg : AuthType.Login));
    };

    return (
        <div>
            {authType === AuthType.Login ? (
                <LoginForm onRegClick={handleToggleAuthType} />
            ) : (
                <RegForm onLoginClick={handleToggleAuthType} />
            )}
        </div>
    );
};
