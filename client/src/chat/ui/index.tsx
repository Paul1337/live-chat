import React from 'react';
import { Messenger } from './Messenger/Messenger';
import { ChatSelector } from './ChatSelector/ChatSelector';

export const Chat = () => {
    return (
        <div className='flex h-full'>
            <ChatSelector />
            <Messenger />
        </div>
    );
};
