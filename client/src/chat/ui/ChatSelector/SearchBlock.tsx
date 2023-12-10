import React, { ChangeEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectSearchText } from '../../selectors/chatSelectors';
import { useAppDispatch } from '../../../app/model/store.model';
import { chatActions } from '../../slices/chatSlice';

export const SearchBlock = () => {
    const searchText = useSelector(selectSearchText);
    const dispatch = useAppDispatch();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(chatActions.setSearchText(e.target.value));
    };

    return (
        <div>
            <label className=''>search</label>
            <input
                className='border p-2 rounded-md ml-2'
                type='text'
                value={searchText}
                onChange={handleChange}
            />
        </div>
    );
};
