import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import './index.css';
import BBS from './components/BBS';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<BBS />, document.getElementById('root'));
registerServiceWorker();
