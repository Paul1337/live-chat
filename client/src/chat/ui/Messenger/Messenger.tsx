import React, { useEffect } from 'react';
import { Message } from '../Message/Message';
import { selectMessages } from '../../selectors/messengerSelectors';
import { useAppSelector } from '../../../app/model/store.model';
import { MessageInput } from '../MessageInput/MessageInput';

const messages = [];

export const Messenger = () => {
    const messages = useAppSelector(selectMessages);

    return (
        <div className='m-2 overflow-y-auto flex-1 flex flex-col'>
            <div className='flex-1 p-2'>
                {messages.map((message) => (
                    <Message
                        key={message.id}
                        isMine={false}
                        text={message.text}
                        date={new Date(message.date)}
                    />
                ))}
            </div>
            <div>
                <MessageInput />
            </div>
        </div>
    );
};
