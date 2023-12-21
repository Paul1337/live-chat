import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { LoginForm } from './LoginForm/LoginForm';
import { RegForm } from './RegForm/RegForm';

enum AuthType {
    Login = 'login',
    Reg = 'reg',
}

const DefaultAuthType = AuthType.Login;

export const AuthPage = () => {
    const navigate = useNavigate();
    const isAuthed = useAuth();
    const { authType = DefaultAuthType } = useParams();

    useEffect(() => {
        if (isAuthed) navigate('/chat');
    }, [isAuthed]);

    // return <div>{authType === AuthType.Login ? <LoginForm /> : <RegForm />}</div>;
};
