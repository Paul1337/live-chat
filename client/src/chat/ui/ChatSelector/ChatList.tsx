import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/model/store.model';
import { useChatId } from '../../hooks/useChatId';
import { ChatScheme } from '../../model/chat.model';
import { thunkLoadChats } from '../../services/loadMyChats';
import { ChatItem } from './ChatItem';

export const ChatList = () => {
    const chatId = useChatId();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const chatItems = useAppSelector(state => state.chat.chat.chatList);
    const searchText = useAppSelector(state => state.chat.chat.searchText);
    const isLoadingChats = useAppSelector(state => state.chat.chat.isLoadingChats);

    const handleChatItemClick = (item: ChatScheme) => {
        navigate(`/chat/${item.chatId}`);
    };

    useEffect(() => {
        dispatch(thunkLoadChats());
    }, []);

    return (
        <div className='flex-1 m-2 overflow-y-auto'>
            {isLoadingChats ? (
                <div>Loading..</div>
            ) : (
                chatItems
                    .filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()))
                    .map(item => (
                        <ChatItem
                            isSelected={item.chatId === chatId}
                            onClick={() => handleChatItemClick(item)}
                            key={item.chatId}
                            chatName={item.name}
                        />
                    ))
            )}
        </div>
    );
};
