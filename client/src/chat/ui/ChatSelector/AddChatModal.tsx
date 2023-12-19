import React, { FC, useState } from 'react';
import { createPortal } from 'react-dom';

interface AddChatModalProps {
    onClose: () => void;
}

export const AddChatModal: FC<AddChatModalProps> = (props) => {
    const { onClose } = props;
    const [username, setUsername] = useState('');

    const handleChatCreate = () => {
        onClose();
    };

    return createPortal(
        <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-50 dark:bg-gray-900 p-4'>
            <div>
                <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                    Username
                </label>
                <input
                    type='text'
                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    placeholder=''
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>

            <button
                className='p-2 rounded-md mt-2 border border-black hover:bg-slate-200'
                onClick={handleChatCreate}
            >
                Create new chat
            </button>
        </div>,
        document.body
    );
};
