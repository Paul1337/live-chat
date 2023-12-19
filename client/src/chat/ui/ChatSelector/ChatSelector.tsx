import { SearchBlock } from './SearchBlock';
import { ChatList } from './ChatList';
import { FC, useEffect } from 'react';
import { thunkLoadChats } from '../../services/loadMyChats';
import { useAppDispatch } from '../../../app/model/store.model';

export const ChatSelector = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(thunkLoadChats());
    }, []);

    return (
        <div className='flex flex-col p-4 m-2 border border-blue-500'>
            <SearchBlock />
            <ChatList />
        </div>
    );
};
