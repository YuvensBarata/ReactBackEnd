import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import {BrowserRouter} from "react-router-dom";

const options = {
    position: 'top center',
    timeout: 2000,
    offset: '30px',
    transition: 'scale'
  }

ReactDOM.render(<BrowserRouter>
                    <App />
                </BrowserRouter>,
document.getElementById('root'));

registerServiceWorker();
