import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/model/store.model';
import { useChatId } from '../../hooks/useChatId';
import { thunkSendMessage } from '../../services/sendMessage';
import { Button } from '../../../shared/ui/Button/Button';

export const MessageInput = () => {
    const [msgText, setMsgText] = useState('');
    const dispatch = useAppDispatch();
    const chatId = useChatId();
    const userData = useAppSelector(state => state.user.userData);

    const handleSendClick = () => {
        if (!chatId || !userData || !msgText) return;
        dispatch(
            thunkSendMessage({
                text: msgText,
                img: '',
                chatId,
                owner: userData.id,
            })
        );
        setMsgText('');
    };

    return (
        <div className='flex flex-col w-full '>
            <textarea
                value={msgText}
                onChange={e => setMsgText(e.target.value)}
                className=' w-full flex-1 rounded-md p-4 border border-black resize-none'
                placeholder='Enter new message'
            ></textarea>
            <Button onClick={handleSendClick} className='hover:bg-slate-300 p-2 rounded-md w-52 mt-2'>
                Send
            </Button>
        </div>
    );
};
