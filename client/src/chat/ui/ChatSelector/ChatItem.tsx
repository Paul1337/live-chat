import classNames from 'classnames';
import React, { CSSProperties, FC } from 'react';

interface ChatItemProps {
    chatName: string;
    photo?: string;
    isSelected: boolean;
    onClick: () => void;
}

import defaultProfile from '../../assets/default_profile.png';

export const ChatItem: FC<ChatItemProps> = props => {
    const { chatName, onClick, isSelected, photo = defaultProfile } = props;
    const photoStyle: CSSProperties = {
        backgroundImage: `url(${photo})`,
    };
    return (
        <div
            onClick={onClick}
            className={classNames(
                'flex justify-between items-center border-blue-500 border-2 rounded-md p-2 m-2 hover:bg-slate-400 cursor-pointer mt-4',
                {
                    'border-red-500': isSelected,
                }
            )}
        >
            <div className='w-8 h-8 bg-cover bg-center' style={photoStyle}></div>
            <h1 className='text-xl'>{chatName}</h1>
        </div>
    );
};
