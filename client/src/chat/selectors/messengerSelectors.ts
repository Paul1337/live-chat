import { RootState } from '../../app/model/store.model';

export const selectMessages = (state: RootState) => state.chat.messenger.messages;
