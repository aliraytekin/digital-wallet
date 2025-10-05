import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './components/UI/Button'
import App from './App';
import { BrowserRouter as Router } from 'react-router';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
