import React, { FC, MouseEvent, useState } from 'react';
import { createPortal } from 'react-dom';
import { Button } from '../../../shared/ui/Button/Button';
import { useAppDispatch } from '../../../app/model/store.model';
import { thunkTryCreatePrivateChat } from '../../services/tryCreateChat';

interface AddChatModalProps {
    onClose: () => void;
}

export const AddChatModal: FC<AddChatModalProps> = props => {
    const { onClose } = props;
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const dispatch = useAppDispatch();

    const handleChatCreate = (e: MouseEvent<HTMLButtonElement>) => {
        if (!username) return;
        dispatch(
            thunkTryCreatePrivateChat({
                username,
            })
        )
            .then(() => {
                onClose();
            })
            .catch(e => {
                setError(e.response?.data?.message);
            });
    };

    const handleBackgroundClick = () => {
        onClose();
    };

    return createPortal(
        <div
            className='w-screen h-screen absolute left-0 top-0 bg-[#0000005e]'
            onClick={handleBackgroundClick}
        >
            <div
                onClick={e => e.stopPropagation()}
                className='absolute w-96 h-64 border rounded-md left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-50 dark:bg-gray-900 p-4'
            >
                <div>
                    <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                        Username
                    </label>
                    <input
                        type='text'
                        className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                        placeholder=''
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                </div>

                <p className='m-2 mt-4 text-red-500 text-xl'>{error}</p>
                <Button
                    text='Create new chat'
                    className='mx-0 bottom-0 absolute'
                    onClick={handleChatCreate}
                />
            </div>
        </div>,
        document.body
    );
};
