import './index.css';
import 'materialize-css/dist/css/materialize.min.css';

import React from 'react';
import ReactDOM from 'react-dom';
import Appc from './components/Appc';
import * as serviceWorker from './serviceWorker';

// M.AutoInit();

// ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<Appc />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
