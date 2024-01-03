import { FC, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { twMerge } from 'tailwind-merge';

interface ModalProps {
    onClose: () => void;
    children: ReactNode;
    className?: string;
}

export const Modal: FC<ModalProps> = props => {
    const { onClose, children, className } = props;

    return createPortal(
        <div className='w-screen h-screen absolute left-0 top-0 bg-[#0000005e]' onClick={onClose}>
            <div
                onClick={e => e.stopPropagation()}
                className={twMerge(
                    'absolute border rounded-md left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-50 dark:bg-gray-900 p-4 ',
                    className
                )}
            >
                {children}
            </div>
        </div>,
        document.body
    );
};
