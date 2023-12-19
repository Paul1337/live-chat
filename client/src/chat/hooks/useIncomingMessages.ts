import { connectSocket, ioClient } from '../../app/api/socketInstance';
import { MessageScheme } from '../model/message.model';
import { useAppDispatch } from '../../app/model/store.model';
import { messengerActions } from '../slices/messengerSlice';
import { useEffect } from 'react';
import { useChatId } from './useChatId';
import { useAuth } from '../../auth/hooks/useAuth';

// const mapMessage = (message: MessageDto): MessageScheme => ({
//     id: message._id,
//     text: message.text,
//     date: message.createdAt,
//     img: message.img,
// });

export const useIncomingMessages = () => {
    const dispatch = useAppDispatch();
    const chatId = useChatId();
    // const isAuthed = useAuth();

    useEffect(() => {
        connectSocket();
        ioClient.on('message', (message: MessageScheme) => {
            if (chatId === message.chatId) {
                dispatch(messengerActions.addMessage(message));
            }
        });
    }, []);
};
