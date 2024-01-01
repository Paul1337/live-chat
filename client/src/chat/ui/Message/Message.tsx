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

export const Message: FC<MessageProps> = (props) => {
	const { text, isMine, date, ownerData, isRead } = props;

	const handleEditClick = () => {};
	const handleRemoveClick = () => {};

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
							className={(isMine ? 'text-green-500' : 'text-red-500').concat(
								' font-["Ubuntu"] font-bold'
							)}
						>
							{isMine ? 'Me' : getOwnerName(ownerData)}
						</div>
						{date && (
							<div className='ml-2 border p-2 rounded-md'>
								Sent at {date.toLocaleString()}
							</div>
						)}
					</div>
					{isMine && (
						<div className=''>
							<button
								onClick={handleEditClick}
								className=' hover:bg-slate-300 p-2 rounded-md font-["Ubuntu"]'
							>
								Edit
							</button>
							<button
								onClick={handleRemoveClick}
								className=' hover:bg-slate-300 p-2 rounded-md font-["Ubuntu"]'
							>
								Remove
							</button>
						</div>
					)}
				</div>
				<p className='text-lg m-2 font-["Ubuntu"] whitespace-break-spaces break-all'>{text}</p>
			</div>
		</div>
	);
};
