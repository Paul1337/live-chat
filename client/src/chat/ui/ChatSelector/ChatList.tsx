import React from 'react';
import { useSelector } from 'react-redux';
import { selectChatItems, selectCurrentChat, selectSearchText } from '../../selectors/chatSelectors';
import { ChatItem } from './ChatItem';
import { ChatScheme } from '../../model/chat.model';
import { useAppDispatch } from '../../../app/model/store.model';
import { chatActions } from '../../slices/chatSlice';

export const ChatList = () => {
    const dispatch = useAppDispatch();
    const chatItems = useSelector(selectChatItems);
    const searchText = useSelector(selectSearchText);
    const currentChat = useSelector(selectCurrentChat);

    const handleChatItemClick = (chatItem: ChatScheme) => {
        dispatch(chatActions.setCurrentChat(chatItem));
    };

    return (
        <div className='flex-1 m-2 overflow-y-auto'>
            {chatItems
                .filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()))
                .map(item => (
                    <ChatItem
                        isSelected={item === currentChat}
                        onClick={() => handleChatItemClick(item)}
                        key={item.chatId}
                        chatName={item.name}
                    />
                ))}
        </div>
    );
};
