import React, { useState } from 'react';
import { ioClient } from '../../socket/socket';
import { MessageScheme } from '../../model/message.model';
import { useAppDispatch } from '../../../app/model/store.model';
import { messengerActions } from '../../slices/messengerSlice';

export const MessageInput = () => {
    const [msgText, setMsgText] = useState('');
    const dispatch = useAppDispatch();

    const handleSendClick = () => {
        ioClient.emit(
            'message',
            {
                text: msgText,
            },
            (newMessage: MessageScheme) => {
                dispatch(messengerActions.addMessage(newMessage));
            }
        );
    };

    return (
        <div className='flex flex-col w-full '>
            <textarea
                value={msgText}
                onChange={e => setMsgText(e.target.value)}
                className=' w-full flex-1 rounded-md p-4 border border-black'
                placeholder='Enter new message'
            ></textarea>
            <button onClick={handleSendClick} className='hover:bg-slate-300 p-2 rounded-md w-52 mt-2'>
                Send
            </button>
        </div>
    );
};
