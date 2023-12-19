import React, { FC, PropsWithChildren, useEffect } from 'react';
import { useAppDispatch } from '../../../app/model/store.model';
import { thunkAuth } from '../../services/auth';

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(thunkAuth());
    }, []);

    return <>{children}</>;
};
