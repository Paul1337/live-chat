import { ResponseUserData } from '../../model/user.model';
import { UserDataScheme } from '../../slices/userSlice';

export const mapUserResponseDataToData = (userData: ResponseUserData): UserDataScheme => ({
    email: userData.email,
    id: userData.id,
    username: userData.username,
});
