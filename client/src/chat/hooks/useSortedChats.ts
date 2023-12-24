import { useEffect, useState } from 'react';
import { useAppSelector } from '../../app/model/store.model';
import { ChatListType } from '../model/chat.model';

export const useSortedChats = () => {
    const chatItems = useAppSelector(state => state.chat.chatList);
    const [sortedChatItems, setSortedChatItems] = useState<ChatListType>([]);

    useEffect(() => {
        setSortedChatItems(
            [...chatItems].sort((chat1, chat2) => {
                return -chat1.unreadCount + chat2.unreadCount;
            })
        );
    }, [chatItems]);

    return sortedChatItems;
};
