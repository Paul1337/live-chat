import classNames from 'classnames';
import React, { CSSProperties, FC } from 'react';
import { ProfileImage } from '../../../shared/ui/ProfileImage/ProfileImage';

interface ChatItemProps {
    chatName: string;
    photo?: string;
    isSelected: boolean;
    onClick: () => void;
}

export const ChatItem: FC<ChatItemProps> = props => {
    const { chatName, onClick, isSelected, photo } = props;
    return (
        <div
            onClick={onClick}
            className={classNames(
                'flex justify-between items-center border-blue-500 border-2 rounded-md p-2 m-2  cursor-pointer mt-4',
                {
                    'bg-blue-300': isSelected,
                    'hover:bg-slate-300': !isSelected,
                }
            )}
        >
            <ProfileImage src={photo} />
            <h1 className='text-xl'>{chatName}</h1>
        </div>
    );
};
