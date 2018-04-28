import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Talk from './Talk.js';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Talk />, document.getElementById('root'));
registerServiceWorker();
