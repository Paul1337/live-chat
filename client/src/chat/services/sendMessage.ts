import { AppThunk } from '../../app/model/store.model';
import { MessageScheme } from '../model/message.model';
import { messengerActions } from '../slices/messengerSlice';
import { ioClient } from '../../app/api/socketInstance';

export const thunkSendMessage = (data: MessageScheme): AppThunk => {
    return (dispatch, getState) => {
        ioClient.emit('message', data, (newMessage: MessageScheme) => {
            dispatch(messengerActions.addMessage(newMessage));
        });
    };
};
