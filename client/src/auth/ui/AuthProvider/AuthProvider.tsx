import React, { FC, PropsWithChildren, useEffect, useState } from 'react';
import { useAppDispatch } from '../../../app/model/store.model';
import { thunkAuth } from '../../services/auth';

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
    const dispatch = useAppDispatch();
    const [authLoading, setAuthLoading] = useState(true);

    useEffect(() => {
        dispatch(thunkAuth()).then(() => {
            setAuthLoading(false);
        });
    }, []);

    return <>{authLoading ? '' : children}</>;
};
