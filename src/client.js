import { doClient } from 'react-redux-saga-server-side-render-helper';
import { appData } from './config';
import '../styles/index.scss';

window.$ = window.jQuery = require('jquery');
require('../node_modules/bootstrap/dist/js/bootstrap.js');
doClient(appData);
