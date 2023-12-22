import React from 'react';
import { ChatSelector } from '../ChatSelector/ChatSelector';
import { ProfileData } from './ProfileData';

export const Sidebar = () => {
    return (
        <div className='flex flex-col p-4 m-2 border border-blue-500'>
            <ProfileData />
            <ChatSelector />
        </div>
    );
};
