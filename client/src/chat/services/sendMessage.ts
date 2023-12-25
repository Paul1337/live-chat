import { AppThunk } from '../../app/model/store.model';
import { MessageResponse, SendMessageRequest } from '../model/message.model';
import { messengerActions } from '../slices/messengerSlice';
import { ioClient } from '../../app/api/socketInstance';
import { mapMessageResponseToScheme } from './converters/message';
import { chatActions } from '../slices/chatSlice';

export const thunkSendMessage = (data: SendMessageRequest): AppThunk => {
    return (dispatch, getState) => {
        ioClient.emit('message', data, (newMessage: MessageResponse) => {
            dispatch(messengerActions.addMessage(mapMessageResponseToScheme(newMessage)));
            dispatch(
                chatActions.updateChatActivity({
                    chatId: data.chatId,
                    lastActivity: new Date(),
                })
            );
        });
    };
};
