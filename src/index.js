import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Demo from './Demo.js';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Demo />, document.getElementById('root'));
registerServiceWorker();
