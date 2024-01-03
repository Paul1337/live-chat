import classNames from 'classnames';
import React, { FC, useState } from 'react';
import { Modal } from '../../../shared/ui/Modal/Modal';
import { RemoveMessageModal } from './RemoveMessageModal';
import { useAppDispatch } from '../../../app/model/store.model';
import { thunkRemoveMessage } from '../../services/removeMessage';

interface OwnerData {
    firstName: string;
    lastName: string;
}

interface MessageProps {
    text: string;
    date?: Date;
    ownerData?: OwnerData;
    isMine: boolean;
    isRead: boolean;
    chatId: string;
    id: string;
}

const getOwnerName = (ownerData?: OwnerData) => {
    if (!ownerData) return 'Him';
    return `${ownerData.firstName} ${ownerData.lastName}`;
};

export const Message: FC<MessageProps> = props => {
    const { text, isMine, date, ownerData, isRead, chatId, id } = props;
    const [showRemoveMessageModal, setShowRemoveMessageModal] = useState(false);
    const dispatch = useAppDispatch();

    const handleRemoveClick = () => setShowRemoveMessageModal(true);
    const confirmRemoveClick = () => {
        dispatch(
            thunkRemoveMessage({
                chatId,
                messageId: id,
            })
        );
        setShowRemoveMessageModal(false);
    };

    return (
        <div
            className={classNames('relative flex ', {
                'justify-end': isMine,
                'justify-start': !isMine,
            })}
        >
            <div
                className={classNames('  border p-4 m-2 rounded-lg border-1 min-w-[520px]', {
                    'border-red-300 border-2': !isRead && isMine,
                    ' bg-green-50 border-green-200': isMine,
                    ' bg-amber-50 border-amber-200': !isMine,
                })}
            >
                <div className=' flex flex-row justify-between border-b-blue-500 border-b p-2 items-center'>
                    <div className='flex items-center justify-between'>
                        <div
                            className={classNames('font-bold', {
                                'text-green-500': isMine,
                                'text-red-500': !isMine,
                            })}
                        >
                            {isMine ? 'Me' : getOwnerName(ownerData)}
                        </div>
                        {date && <div className='ml-2 border p-2 rounded-md'>Sent at {date.toLocaleString()}</div>}
                    </div>
                    {isMine && (
                        <div className=''>
                            {/* <button onClick={handleEditClick} className=' hover:bg-slate-300 p-2 rounded-md'>
                                Edit
                            </button> */}
                            <button onClick={handleRemoveClick} className=' hover:bg-slate-300 p-2 rounded-md'>
                                Remove
                            </button>
                        </div>
                    )}
                </div>
                <p className='text-lg m-2 font-light whitespace-break-spaces break-all'>{text}</p>
            </div>
            {showRemoveMessageModal && (
                <RemoveMessageModal
                    onClose={() => setShowRemoveMessageModal(false)}
                    onRemoveClick={confirmRemoveClick}
                />
            )}
        </div>
    );
};
