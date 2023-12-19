import { useAppSelector } from '../../../app/model/store.model';
import { selectMessages } from '../../selectors/messengerSelectors';
import { Message } from '../Message/Message';
import { MessageInput } from '../MessageInput/MessageInput';

export const Messenger = () => {
    const messages = useAppSelector(selectMessages);

    return (
        <div className='m-2 overflow-y-auto flex-1 flex flex-col'>
            <div className='flex-1 p-2'>
                {messages.map(message => (
                    <Message
                        key={message._id}
                        isMine={false}
                        text={message.text ?? ''}
                        date={message.createdAt ? new Date(message.createdAt) : undefined}
                    />
                ))}
            </div>
            <div>
                <MessageInput />
            </div>
        </div>
    );
};
