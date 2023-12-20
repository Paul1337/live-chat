import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState, useAppDispatch } from '../../../app/model/store.model';
import { useChatId } from '../../hooks/useChatId';
import { ChatScheme } from '../../model/chat.model';
import { selectChatItems, selectSearchText } from '../../selectors/chatSelectors';
import { ChatItem } from './ChatItem';
import { thunkLoadChats } from '../../services/loadMyChats';
import { useEffect } from 'react';

export const ChatList = () => {
    const chatItems = useSelector(selectChatItems);
    const searchText = useSelector(selectSearchText);
    const chatId = useChatId();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isLoadingChats = useSelector((state: RootState) => state.chat.chat.isLoadingChats);

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
