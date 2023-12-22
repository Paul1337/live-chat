import { ChatList } from './ChatList';
import { TopPanel } from './TopPanel';

export const ChatSelector = () => {
    return (
        <div className='flex-1 border my-2'>
            <TopPanel />
            <ChatList />
        </div>
    );
};
