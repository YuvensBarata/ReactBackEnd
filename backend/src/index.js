import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import {BrowserRouter} from "react-router-dom";

import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

const options = {
    position: 'top center',
    timeout: 2000,
    offset: '30px',
    transition: 'scale'
  }

ReactDOM.render(<BrowserRouter>
                <AlertProvider template={AlertTemplate} {...options}>
                    <App />
                </AlertProvider>
                </BrowserRouter>,
document.getElementById('root'));

registerServiceWorker();
