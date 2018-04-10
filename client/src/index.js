import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Profile from './js/components/Profile';
import Login from './js/components/Login';
import VouchList from './js/components/VouchList';
import VouchAverage from './js/components/VouchAverage';
import VouchTally from './js/components/VouchTally';
import Vouching from './js/components/Vouching';
import Search from './js/components/Search';

import registerServiceWorker from './js/registerServiceWorker';

ReactDOM.render(<Vouching />, document.getElementById('root'));
// ReactDOM.render(<Vouching />, document.getElementById('root'));

import registerServiceWorker from './js/registerServiceWorker';

ReactDOM.render(<Search />, document.getElementById('root'));
registerServiceWorker();
