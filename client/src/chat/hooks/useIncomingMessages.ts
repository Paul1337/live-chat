import { ioClient } from '../socket/socket';
import { MessageDto, MessageScheme } from '../model/message.model';
import { useAppDispatch } from '../../app/model/store.model';
import { messengerActions } from '../slices/messengerSlice';
import { useEffect } from 'react';

const mapMessage = (message: MessageDto): MessageScheme => ({
    id: message._id,
    text: message.text,
});

export const useIncomingMessages = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        ioClient.on('message', (message: MessageDto) => {
            dispatch(messengerActions.addMessage(mapMessage(message)));
        });
    }, []);
};
