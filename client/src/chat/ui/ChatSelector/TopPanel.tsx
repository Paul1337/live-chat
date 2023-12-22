import { ChangeEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/model/store.model';
import { chatActions } from '../../slices/chatSlice';
import { AddChatModal } from './AddChatModal';
import { Button } from '../../../shared/ui/Button/Button';

import searchImg from '../../assets/search-img.svg';

export const TopPanel = () => {
    const searchText = useAppSelector(state => state.chat.searchText);
    const dispatch = useAppDispatch();
    const [showAddChat, setShowAddChat] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(chatActions.setSearchText(e.target.value));
    };

    const handleAddChatClick = () => {
        setShowAddChat(show => !show);
    };

    return (
        <div className='flex justify-around items-center m-2'>
            <div
                className={`w-6 h-6 bg-center bg-cover`}
                style={{ backgroundImage: `url(${searchImg})` }}
            ></div>
            <input
                className='border p-2 rounded-md ml-2'
                type='search'
                placeholder='Chat name..'
                value={searchText}
                onChange={handleChange}
            />
            <Button onClick={handleAddChatClick} className='w-9 h-9 p-0 border relative'>
                <span className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>+</span>
            </Button>

            {showAddChat && <AddChatModal onClose={() => setShowAddChat(false)} />}
        </div>
    );
};
