import { RootState } from '../../app/model/store.model';

export const selectChatItems = (state: RootState) => state.chat.chat.chatList;
export const selectSearchText = (state: RootState) => state.chat.chat.searchText;
export const selectCurrentChat = (state: RootState) => state.chat.chat.currentChat;
