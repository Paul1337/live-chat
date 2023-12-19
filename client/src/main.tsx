import ReactDOM from 'react-dom/client';
import { App } from './app/App.tsx';
import './index.css';
import { StoreProvider } from './app/StoreProvider.tsx';
import { AuthProvider } from './auth/ui/AuthProvider/AuthProvider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <StoreProvider>
        <AuthProvider>
            <App />
        </AuthProvider>
    </StoreProvider>
);
