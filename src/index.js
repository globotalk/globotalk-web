import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MyAwesomeConversation from './MyAwesomeConversation.js';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<MyAwesomeConversation />, document.getElementById('root'));
registerServiceWorker();
