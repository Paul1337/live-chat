import { ChangeEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/model/store.model';
import { chatActions } from '../../slices/chatSlice';
import { AddChatModal } from './AddChatModal';

export const TopPanel = () => {
    const searchText = useAppSelector(state => state.chat.chat.searchText);
    const dispatch = useAppDispatch();
    const [showAddChat, setShowAddChat] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(chatActions.setSearchText(e.target.value));
    };

    const handleAddChatClick = () => {
        setShowAddChat(show => !show);
    };

    return (
        <div className='flex justify-around items-center'>
            <label className=''>search</label>
            <input
                className='border p-2 rounded-md ml-2'
                type='text'
                value={searchText}
                onChange={handleChange}
            />
            <button onClick={handleAddChatClick} className='w-9 h-9 m-2 border rounded-md'>
                +
            </button>

            {showAddChat && <AddChatModal onClose={() => setShowAddChat(false)} />}
        </div>
    );
};
