
import React from 'react';;
import ReactDOM from 'react-dom/client';
import App from './app';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'


const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Target container is not a DOM element.');
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);