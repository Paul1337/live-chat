import React, { FC } from 'react';
import { Modal } from '../../../shared/ui/Modal/Modal';
import { Button } from '../../../shared/ui/Button/Button';

interface RemoveMessageModalProps {
    onClose: () => void;
    onRemoveClick: () => void;
}

export const RemoveMessageModal: FC<RemoveMessageModalProps> = props => {
    const { onClose, onRemoveClick } = props;

    return (
        <Modal onClose={onClose} className='w-96 h-64 flex flex-col justify-between'>
            <p>Are you sure to remove message?</p>
            <div className='flex flex-row justify-end'>
                <Button
                    className='m-1 bg-blue-200 hover:bg-blue-300'
                    text={'remove'}
                    onClick={onRemoveClick}
                ></Button>
                <Button className='m-1' text={'cancel'} onClick={onClose}></Button>
            </div>
        </Modal>
    );
};
