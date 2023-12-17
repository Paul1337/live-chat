import React, { useEffect } from 'react';
import { Messenger } from './Messenger/Messenger';
import { ChatSelector } from './ChatSelector/ChatSelector';
import { useIncomingMessages } from '../hooks/useIncomingMessages';
import { useParams } from 'react-router-dom';

export const Chat = () => {
    const params = useParams();
    console.log(params);
    useIncomingMessages();

    return (
        <div className='flex h-full'>
            <ChatSelector />
            <Messenger />
        </div>
    );
};
