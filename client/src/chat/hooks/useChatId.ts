import { useParams } from 'react-router-dom';

export const useChatId = () => {
    const params = useParams();
    return params.chatId;
};
