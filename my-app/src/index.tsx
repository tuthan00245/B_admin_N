import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { StoreProvider } from './store';
// import GlobalStyles from './components/GlobalStyles';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    // <GlobalStyles>
        <StoreProvider>
            <Router>
                <App />
            </Router>
        </StoreProvider>
    // </GlobalStyles>
);
