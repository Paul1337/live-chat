import React, { FC, useEffect } from 'react';
import { Messenger } from './Messenger/Messenger';
import { ChatSelector } from './ChatSelector/ChatSelector';
import { useIncomingMessages } from '../hooks/useIncomingMessages';
import { thunkLoadChatMessages } from '../services/loadChatMessages';
import { useChatId } from '../hooks/useChatId';
import { useAppDispatch } from '../../app/model/store.model';

interface ChatProps {}

export const Chat: FC<ChatProps> = props => {
    const chatId = useChatId();
    const dispatch = useAppDispatch();

    useIncomingMessages();

    useEffect(() => {
        if (chatId) {
            dispatch(thunkLoadChatMessages(chatId));
        }
    }, [chatId]);

    return (
        <div className='flex h-full'>
            <ChatSelector />
            {chatId && <Messenger />}
        </div>
    );
};
