import classNames from 'classnames';
import React, { FC } from 'react';

interface ChatItemProps {
    chatName: string;
    isSelected: boolean;
    onClick: () => void;
}

export const ChatItem: FC<ChatItemProps> = props => {
    const { chatName, onClick, isSelected } = props;
    return (
        <div
            onClick={onClick}
            className={classNames(
                'border-blue-500 border-2 rounded-md p-2 m-2 hover:bg-slate-400 cursor-pointer mt-4',
                {
                    'border-red-500': isSelected,
                }
            )}
        >
            <h1 className='text-xl'>{chatName}</h1>
        </div>
    );
};
