import { connectSocket, ioClient } from '../../app/api/socketInstance';
import { MessageScheme } from '../model/message.model';
import { useAppDispatch } from '../../app/model/store.model';
import { messengerActions } from '../slices/messengerSlice';
import { useEffect } from 'react';
import { useChatId } from './useChatId';

export const useIncomingMessages = () => {
    const dispatch = useAppDispatch();
    const chatId = useChatId();

    const handleNewMessage = (message: MessageScheme) => {
        if (chatId == message.chatId) {
            dispatch(messengerActions.addMessage(message));
        }
    };

    useEffect(() => {
        connectSocket();

        ioClient.off('message');
        ioClient.on('message', handleNewMessage);
    }, [handleNewMessage]);
};
