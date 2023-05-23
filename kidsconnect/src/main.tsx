import { StrictMode } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

const queryClient = new QueryClient();
createRoot(document.getElementById('root') as HTMLElement).render(
    // <StrictMode>
    <QueryClientProvider client={queryClient}>
        <Router>
            <App />
        </Router>
    </QueryClientProvider>,
    // </StrictMode>,
);
