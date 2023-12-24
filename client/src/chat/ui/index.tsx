import { FC } from 'react';
import { useChatId } from '../hooks/useChatId';
import { useMessenger } from '../hooks/useMessenger';
import { Messenger } from './Messenger/Messenger';
import { Sidebar } from './Sidebar/Sidebar';

interface ChatProps {}

export const Chat: FC<ChatProps> = props => {
    const chatId = useChatId();

    useMessenger();

    return (
        <div className='flex h-full'>
            <Sidebar />
            {chatId && <Messenger />}
        </div>
    );
};
