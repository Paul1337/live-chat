import { KeyboardEvent, KeyboardEventHandler, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/model/store.model';
import { useChatId } from '../../hooks/useChatId';
import { thunkSendMessage } from '../../services/sendMessage';
import { Button } from '../../../shared/ui/Button/Button';

export const MessageInput = () => {
	const [msgText, setMsgText] = useState('');
	const dispatch = useAppDispatch();
	const chatId = useChatId();
	const userData = useAppSelector((state) => state.user.userData);
	const textAreaRef = useRef<HTMLTextAreaElement>(null);

	const trySendMessage = () => {
		if (!chatId || !userData || !msgText) return;

		dispatch(
			thunkSendMessage({
				text: msgText,
				img: '',
				chatId,
				owner: userData.id,
			})
		);
		setMsgText('');
	};

	const handleSendClick = () => {
		trySendMessage();
	};

	const handleKeydown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.code === 'Enter') {
			if (e.ctrlKey || e.metaKey) {
				console.log('перенос');
				const textAreaEl = textAreaRef.current;
				if (!textAreaEl) return;

				let val = textAreaEl.value,
					start = textAreaEl.selectionStart,
					end = textAreaEl.selectionEnd,
					curs = val.substring(0, start) + '\n';

				textAreaEl.value = val.substring(0, start) + '\n' + val.substring(end, val.length);

				textAreaEl.focus();
				textAreaEl.setSelectionRange(curs.length, curs.length);
			} else {
				e.preventDefault();
				trySendMessage();
			}
		}
	};

	return (
		<div className='flex flex-col w-full'>
			<textarea
				ref={textAreaRef}
				onKeyDown={handleKeydown}
				value={msgText}
				onChange={(e) => setMsgText(e.target.value)}
				className=' font-["Ubuntu"] w-full flex-1 rounded-md p-4 border border-black resize-none'
				placeholder='Enter new message'
			></textarea>
			<Button
				onClick={handleSendClick}
				className='font-["Ubuntu"] hover:bg-slate-300 p-2 rounded-md w-52 mt-2 font-bold'
			>
				Send
			</Button>
		</div>
	);
};
