import ReactDOM from 'react-dom/client';
import { App } from './app/App.tsx';
import { StoreProvider } from './app/storeProvider.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <StoreProvider>
        <App />
    </StoreProvider>
);
