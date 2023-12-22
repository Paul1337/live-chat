import React from 'react';
import { Button } from '../../../shared/ui/Button/Button';
import { useAppDispatch, useAppSelector } from '../../../app/model/store.model';
import { thunkLogout } from '../../../auth/services/logout';
import { useNavigate } from 'react-router-dom';
import { ProfileImage } from '../../../shared/ui/ProfileImage/ProfileImage';

export const ProfileData = () => {
    const { username, firstName, lastName, photo } = useAppSelector(state => state.user.userData)!;
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(thunkLogout());
        navigate('/auth/login');
    };

    return (
        <div className='border'>
            <div className='flex justify-center items-center mt-2'>
                <p>
                    {firstName} {lastName}
                </p>
                <p className='text-center font-bold ml-2'>@{username}</p>
            </div>
            <div className='flex flex-row justify-between px-2 items-center'>
                <div className='flex items-center'>
                    <ProfileImage className='w-10 h-10' src={photo} />
                    <Button className='text-sm p-1' text='upload image' />
                </div>
                <Button text='Log out' onClick={handleLogout} />
            </div>
        </div>
    );
};
