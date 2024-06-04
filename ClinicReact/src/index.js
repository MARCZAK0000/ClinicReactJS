import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import ErrorBoundry from './ErrorBoundary';
import Error from './Components/HelperComponents/Error/Error';
import { UserProvider } from './Components/HelperComponents/ThemeProvider/UserContext';
import { CurrentUserProvider } from './Components/HelperComponents/ThemeProvider/CurrentUserContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ErrorBoundry fallback={<Error />}>
        <UserProvider>
          <CurrentUserProvider>
            <App />
          </CurrentUserProvider>
        </UserProvider>
      </ErrorBoundry>
    </BrowserRouter>
  </React.StrictMode>
);

