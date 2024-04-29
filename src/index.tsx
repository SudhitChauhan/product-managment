import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'animate.css';
import App from './App';
import GlobalState from './_context/GlobalState';
import { Toaster } from 'react-hot-toast';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <GlobalState>
    <>
      <App />
      <Toaster
        position="bottom-center"
        reverseOrder={false}
      />
    </>
  </GlobalState>
);
