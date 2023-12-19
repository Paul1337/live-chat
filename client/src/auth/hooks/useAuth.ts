import { useSelector } from 'react-redux';
import { RootState } from '../../app/model/store.model';

export const useAuth = () => {
    const isAuthed = useSelector((state: RootState) => state.user.isAuthed);
    return isAuthed;
};
