import { AuthProvider } from '../auth/ui/AuthProvider/AuthProvider';
import { StoreProvider } from './StoreProvider';
import { AppRouter } from './ui/AppRouter/AppRouter';

export const App = () => {
    return (
        <StoreProvider>
            <AuthProvider>
                <AppRouter />
            </AuthProvider>
        </StoreProvider>
    );
};
