import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import {AppServicesProvider} from './middleware/appServicesContext';
import './index.css';
import App from './App';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AppServicesProvider>
        <App />
      </AppServicesProvider>
    </BrowserRouter>
  </StrictMode>
);

