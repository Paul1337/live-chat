import { ChatList } from './ChatList';
import { TopPanel } from './TopPanel';

export const ChatSelector = () => {
    return (
        <div className='flex flex-col p-4 m-2 border border-blue-500'>
            <TopPanel />
            <ChatList />
        </div>
    );
};
