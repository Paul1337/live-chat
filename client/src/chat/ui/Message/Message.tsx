import React, { FC } from 'react';

interface MessageProps {
    text: string;
    date?: Date;
    from?: {
        name: string;
        photo: string;
    };
    isMine: boolean;
}

export const Message: FC<MessageProps> = props => {
    const { text, isMine, date } = props;
    return (
        <div className='border-blue-500 p-4 m-4 rounded-md border'>
            <div className=' flex justify-between border-b-blue-500 border-b p-2 items-center'>
                <div className='flex items-center justify-between'>
                    <div className={isMine ? 'text-green-500' : 'text-red-500'}>
                        {isMine ? 'Me' : 'Him'}
                    </div>
                    {date && (
                        <div className='ml-2 border p-2 rounded-md'>Sent at {date.toLocaleString()}</div>
                    )}
                </div>
                <div className=''>
                    <button className=' hover:bg-slate-300 p-2 rounded-md'>Edit</button>
                    <button className=' hover:bg-slate-300 p-2 rounded-md'>Remove</button>
                </div>
            </div>
            <p className='text-lg m-2 font-bold'>{text}</p>
        </div>
    );
};
