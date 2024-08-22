import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import Modal from 'react-modal';
import { GoogleOAuthProvider } from '@react-oauth/google';


Modal.setAppElement('#root');

// Access the client ID from environment variables
const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <BrowserRouter>
  
        <App />
       
      </BrowserRouter>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
