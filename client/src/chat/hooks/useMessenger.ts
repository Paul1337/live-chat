import { RefObject, useEffect, useRef } from 'react';
import { connectSocket, ioClient } from '../../app/api/socketInstance';
import { useAppDispatch, useAppSelector } from '../../app/model/store.model';
import { MessageResponse } from '../model/message.model';
import { mapMessageResponseToScheme } from '../services/converters/message';
import { thunkLoadChatMessages } from '../services/loadChatMessages';
import { chatActions } from '../slices/chatSlice';
import { messengerActions } from '../slices/messengerSlice';
import { useChatId } from './useChatId';

interface ReadChatResponse {
    userId: string;
    chatId: string;
}

interface RemoveMessageResponse {
    messageId: string;
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
                // messagesContRef.current?.scrollTo(0, messagesContRef.current.scrollHeight);
            } else {
                dispatch(
                    chatActions.updateChatActivity({
                        chatId: message.chatId,
                        lastActivity: new Date().toString(),
                    })
                );
                dispatch(
                    chatActions.incrementChatUnread({
                        chatId: message.chatId,
                        amount: 1,
                    })
                );
            }
        };

        const handleReadChat = ({ chatId, userId }: ReadChatResponse) => {
            console.log('on read', chatId);
            // dispatch(chatActions.readChat(chatId));
            if (currentChatIdRef.current == chatId) {
                dispatch(messengerActions.readAll());
            }
        };

        const handleRemoveMessage = ({ chatId, messageId }: RemoveMessageResponse) => {
            if (currentChatIdRef.current == chatId) {
                dispatch(messengerActions.removeMessage(messageId));
            }
        };

        connectSocket();

        ioClient.on('message', handleNewMessage);
        ioClient.on('read', handleReadChat);
        ioClient.on('remove-message', handleRemoveMessage);

        return () => {
            ioClient.off('message', handleNewMessage);
            ioClient.off('read', handleReadChat);
            ioClient.off('remove-message', handleRemoveMessage);

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
