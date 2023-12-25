import { useEffect, useState } from 'react';
import { useAppSelector } from '../../app/model/store.model';
import { ChatListType } from '../model/chat.model';

export const useSortedChats = () => {
    const chatItems = useAppSelector(state => state.chat.chatList);
    const [sortedChatItems, setSortedChatItems] = useState<ChatListType>([]);

    useEffect(() => {
        setSortedChatItems(
            [...chatItems].sort((chat1, chat2) => {
                if (!chat1.lastActivity) return 1;
                if (!chat2.lastActivity) return -1;
                return -new Date(chat1.lastActivity).getTime() + new Date(chat2.lastActivity).getTime();
            })
        );
    }, [chatItems]);

    return sortedChatItems;
};
