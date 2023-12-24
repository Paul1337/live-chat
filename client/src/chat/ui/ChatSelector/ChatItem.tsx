import classNames from 'classnames';
import { FC } from 'react';
import { ProfileImage } from '../../../shared/ui/ProfileImage/ProfileImage';

interface ChatItemProps {
    chatName: string;
    photo?: string;
    isSelected: boolean;
    onClick: () => void;
    unreadCount: number;
}

export const ChatItem: FC<ChatItemProps> = props => {
    const { chatName, onClick, isSelected, photo, unreadCount } = props;

    const profileImgSrc = photo && new URL(photo, import.meta.env.VITE_STATIC_BASE_URL).href;

    return (
        <div
            onClick={onClick}
            className={classNames(
                'flex justify-between relative items-center border-blue-500 border-2 rounded-md p-2 m-2  cursor-pointer mt-4',
                {
                    'bg-blue-300': isSelected,
                    'hover:bg-slate-300': !isSelected,
                }
            )}
        >
            <ProfileImage src={profileImgSrc} />
            <h1 className='text-xl'>{chatName}</h1>
            {unreadCount > 0 && (
                <div className='absolute -right-2 -top-2 w-5 h-5 bg-red-500 rounded-full'>
                    <span className='text-white text-sm absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
                        {unreadCount}
                    </span>
                </div>
            )}
        </div>
    );
};
