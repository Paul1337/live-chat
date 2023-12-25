import React, { ChangeEvent, useEffect, useRef } from 'react';
import { Button } from '../../../shared/ui/Button/Button';
import { useAppDispatch, useAppSelector } from '../../../app/model/store.model';
import { thunkLogout } from '../../../auth/services/logout';
import { useNavigate } from 'react-router-dom';
import { ProfileImage } from '../../../shared/ui/ProfileImage/ProfileImage';
import { thunkUploadPhoto } from '../../services/uploadPhoto';
import { thunkLoadUserProfileData } from '../../services/loadUserProfileData';

export const ProfileData = () => {
    const { username } = useAppSelector(state => state.user.userData)!;
    const profileData = useAppSelector(state => state.user.profileData);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const inputFileRef = useRef<HTMLInputElement>(null);

    const handleLogout = () => {
        dispatch(thunkLogout());
        navigate('/auth/login');
    };

    const handleImageUpdloadClick = () => {
        inputFileRef.current?.click();
    };

    const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        console.log('changed', inputFileRef.current?.files?.[0]);
        dispatch(
            thunkUploadPhoto({
                file: inputFileRef.current?.files?.[0],
            })
        );
    };

    useEffect(() => {
        dispatch(thunkLoadUserProfileData());
    }, []);

    if (!profileData) return <p>Loading</p>;

    const profilePhotoSrc =
        profileData.photo && new URL(profileData.photo, import.meta.env.VITE_STATIC_BASE_URL).href;

    return (
        <div className='border'>
            <div className='flex justify-center items-center mt-2'>
                <p>
                    {profileData.firstName} {profileData.lastName}
                </p>
                <p className='text-center font-bold ml-2'>@{username}</p>
            </div>
            <div className='flex flex-row justify-between px-2 items-center'>
                <div className='flex items-center'>
                    <ProfileImage className='w-12 h-12' src={profilePhotoSrc} />
                    <div>
                        <Button
                            onClick={handleImageUpdloadClick}
                            className='text-sm p-1'
                            text='upload image'
                        />
                        <input
                            onChange={handleFileInputChange}
                            ref={inputFileRef}
                            type='file'
                            className='absolute opacity-0 w-0 h-0'
                        />
                    </div>
                </div>
                <Button text='Log out' onClick={handleLogout} />
            </div>
        </div>
    );
};
