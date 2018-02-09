import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import IdeasContainer from './IdeasContainer/index.jsx';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<IdeasContainer />, document.getElementById('root'));
registerServiceWorker();
