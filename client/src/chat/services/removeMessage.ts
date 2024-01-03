import { ioClient } from '../../app/api/socketInstance';
import { AppThunk } from '../../app/model/store.model';
import { messengerActions } from '../slices/messengerSlice';

interface RemoveMessageRequest {
    messageId: string;
    chatId: string;
}

export const thunkRemoveMessage = (data: RemoveMessageRequest): AppThunk => {
    return (dispatch, getState) => {
        ioClient.emit('remove-message', data);
        dispatch(messengerActions.removeMessage(data.messageId));
    };
};
