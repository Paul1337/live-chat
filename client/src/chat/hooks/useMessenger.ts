import { connectSocket, ioClient } from '../../app/api/socketInstance';
import { MessageResponse, MessageScheme } from '../model/message.model';
import { useAppDispatch, useAppSelector } from '../../app/model/store.model';
import { messengerActions } from '../slices/messengerSlice';
import { useEffect, useReducer, useRef } from 'react';
import { useChatId } from './useChatId';
import { mapMessageResponseToScheme } from '../services/converters/message';
import { chatActions } from '../slices/chatSlice';
import { thunkLoadChats } from '../services/loadMyChats';
import { thunkLoadChatMessages } from '../services/loadChatMessages';

interface ReadChatResponse {
    userId: string;
    chatId: string;
}

export const useMessenger = () => {
    const dispatch = useAppDispatch();
    const currentChatId = useChatId();
    const currentChatIdRef = useRef(currentChatId);
    useEffect(() => {
        currentChatIdRef.current = currentChatId;
    }, [currentChatId]);
    const userData = useAppSelector(state => state.user.userData)!;

    useEffect(() => {
        const handleNewMessage = (message: MessageResponse) => {
            console.log('on new message', message);

            if (currentChatIdRef.current == message.chatId) {
                console.log('Chat matched');
                dispatch(messengerActions.addMessage(mapMessageResponseToScheme(message)));
                ioClient.emit('read', {
                    chatId: currentChatIdRef.current,
                    userId: userData.id,
                });
            } else {
                dispatch(thunkLoadChats()); // updating all chats
            }
        };

        const handleReadChat = ({ chatId, userId }: ReadChatResponse) => {
            console.log('on read', chatId);
            dispatch(chatActions.readChat(chatId));
            if (currentChatIdRef.current == chatId) {
                dispatch(messengerActions.readAll());
            }
        };

        connectSocket();

        ioClient.on('message', handleNewMessage);
        ioClient.on('read', handleReadChat);

        return () => {
            ioClient.off('message', handleNewMessage);
            ioClient.off('read', handleReadChat);

            ioClient.disconnect();
        };
    }, []);

    useEffect(() => {
        if (currentChatId) {
            dispatch(thunkLoadChatMessages(currentChatId));
            ioClient.emit('read', {
                chatId: currentChatId,
                userId: userData?.id,
            });
            dispatch(chatActions.readChat(currentChatId));
        }
    }, [currentChatId]);
};
