import { doClient } from './ssr/helper';
import { appData } from './config';
import appSettings from './constants/aplication';
import '../styles/index.scss';
import ReactGA from 'react-ga';

// window.$ = window.jQuery = require('jquery');
// require('../node_modules/bootstrap/dist/js/bootstrap.js');

// Google Analytics
ReactGA.initialize(appSettings.GAID);
ReactGA.ga('send', {
    hitType: 'pageview',
    title: window.document.title,
    location: window.location.pathname + window.location.search,
    page: window.location.pathname
});

doClient(appData);
