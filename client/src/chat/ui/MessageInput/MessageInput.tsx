import React from 'react';

export const MessageInput = () => {
    return (
        <div className='flex flex-col w-full '>
            <textarea className=' w-full flex-1 rounded-md p-4 border border-black'>
                MessageInput
            </textarea>
            <button className='hover:bg-slate-300 p-2 rounded-md w-52 mt-2'>Send</button>
        </div>
    );
};
