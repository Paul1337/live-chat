import { useAppSelector } from '../../app/model/store.model';

export const useAuth = () => {
    const isAuthed = useAppSelector(state => state.user.isAuthed);
    return isAuthed;
};
