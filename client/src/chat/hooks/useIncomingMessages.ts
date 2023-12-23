import { connectSocket, ioClient } from '../../app/api/socketInstance';
import { MessageResponse, MessageScheme } from '../model/message.model';
import { useAppDispatch } from '../../app/model/store.model';
import { messengerActions } from '../slices/messengerSlice';
import { useEffect } from 'react';
import { useChatId } from './useChatId';
import { mapMessageResponseToScheme } from '../services/converters/message';

export const useIncomingMessages = () => {
    const dispatch = useAppDispatch();
    const chatId = useChatId();

    useEffect(() => {
        const handleNewMessage = (message: MessageResponse) => {
            if (chatId == message.chatId) {
                dispatch(messengerActions.addMessage(mapMessageResponseToScheme(message)));
            }
        };

        connectSocket();
        ioClient.on('message', handleNewMessage);

        return () => {
            ioClient.off('message');
            ioClient.disconnect();
        };
    }, []);
};
