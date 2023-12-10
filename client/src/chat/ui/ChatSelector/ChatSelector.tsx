import { SearchBlock } from './SearchBlock';
import { ChatList } from './ChatList';

export const ChatSelector = () => {
    return (
        <div className='flex flex-col p-4 m-2 border border-blue-500'>
            <SearchBlock />
            <ChatList />
        </div>
    );
};
