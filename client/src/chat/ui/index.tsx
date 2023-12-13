import React, { useEffect } from 'react';
import { Messenger } from './Messenger/Messenger';
import { ChatSelector } from './ChatSelector/ChatSelector';
import { ioClient } from '../socket/socket';

export const Chat = () => {
    useEffect(() => {
        ioClient.on('message', (data: any) => {
            console.log('Message', data);
        });
    }, []);

    return (
        <div className='flex h-full'>
            <ChatSelector />
            <Messenger />
        </div>
    );
};
