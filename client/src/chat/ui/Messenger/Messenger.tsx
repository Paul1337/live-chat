import { useSelector } from 'react-redux';
import { RootState, useAppSelector } from '../../../app/model/store.model';
import { selectMessages } from '../../selectors/messengerSelectors';
import { Message } from '../Message/Message';
import { MessageInput } from '../MessageInput/MessageInput';
import { useEffect, useRef } from 'react';

export const Messenger = () => {
    const messages = useAppSelector(selectMessages);
    const userData = useSelector((state: RootState) => state.user.userData);
    const messagesContRef = useRef<HTMLDivElement>(null);
    const isLoadingMessages = useSelector((state: RootState) => state.chat.messenger.isLoadingMessages);

    useEffect(() => {
        if (messagesContRef.current) {
            messagesContRef.current.scrollTo(0, messagesContRef.current.scrollHeight);
        }
    }, [messages]);

    return (
        <div className='m-2 overflow-y-auto flex-1 flex flex-col'>
            <div ref={messagesContRef} className='flex-1 p-2 overflow-y-auto scroll-smooth'>
                {isLoadingMessages ? (
                    <div className='text-center'>Is loading...</div>
                ) : (
                    messages.map((message) => (
                        <Message
                            key={message._id}
                            isMine={message.owner === userData?.id}
                            text={message.text ?? ''}
                            date={message.createdAt ? new Date(message.createdAt) : undefined}
                        />
                    ))
                )}
            </div>
            <MessageInput />
        </div>
    );
};
