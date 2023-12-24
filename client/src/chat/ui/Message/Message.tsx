import classNames from 'classnames';
import React, { FC } from 'react';

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
}

const getOwnerName = (ownerData?: OwnerData) => {
    if (!ownerData) return 'Him';
    return `${ownerData.firstName} ${ownerData.lastName}`;
};

export const Message: FC<MessageProps> = props => {
    const { text, isMine, date, ownerData, isRead } = props;

    const handleEditClick = () => {};
    const handleRemoveClick = () => {};

    return (
        <div
            className={classNames('border-blue-500 p-4 m-4 rounded-md border', {
                'bg-blue-100 border-2': !isRead && isMine,
            })}
        >
            <div className=' flex justify-between border-b-blue-500 border-b p-2 items-center'>
                <div className='flex items-center justify-between'>
                    <div className={(isMine ? 'text-green-500' : 'text-red-500').concat(' font-medium')}>
                        {isMine ? 'Me' : getOwnerName(ownerData)}
                    </div>
                    {date && (
                        <div className='ml-2 border p-2 rounded-md'>Sent at {date.toLocaleString()}</div>
                    )}
                </div>
                <div className=''>
                    <button onClick={handleEditClick} className=' hover:bg-slate-300 p-2 rounded-md'>
                        Edit
                    </button>
                    <button onClick={handleRemoveClick} className=' hover:bg-slate-300 p-2 rounded-md'>
                        Remove
                    </button>
                </div>
            </div>
            <p className='text-lg m-2 font-bold'>{text}</p>
        </div>
    );
};
