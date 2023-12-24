import { useEffect, useRef } from 'react';
import { useAppSelector } from '../../../app/model/store.model';
import { Message } from '../Message/Message';
import { MessageInput } from '../MessageInput/MessageInput';

export const Messenger = () => {
    const messages = useAppSelector(state => state.messenger.messages);
    const userData = useAppSelector(state => state.user.userData);
    const messagesContRef = useRef<HTMLDivElement>(null);
    const isLoadingMessages = useAppSelector(state => state.messenger.isLoadingMessages);

    useEffect(() => {
        messagesContRef.current?.scrollTo(0, messagesContRef.current.scrollHeight);
    }, [messages]);

    return (
        <div className='m-2 overflow-y-auto flex-1 flex flex-col'>
            <div ref={messagesContRef} className='flex-1 p-2 overflow-y-auto'>
                {isLoadingMessages ? (
                    <div className='text-center'>Is loading...</div>
                ) : messages.length === 0 ? (
                    <p className='text-center m-2 font-medium text-gray-500'>
                        No messages yet, be first to send something :)
                    </p>
                ) : (
                    messages.map(message => (
                        <Message
                            key={message._id}
                            ownerData={message.ownerData}
                            isMine={message.owner === userData?.id}
                            text={message.text ?? ''}
                            isRead={message.isRead}
                            date={message.createdAt ? new Date(message.createdAt) : undefined}
                        />
                    ))
                )}
            </div>
            <MessageInput />
        </div>
    );
};
