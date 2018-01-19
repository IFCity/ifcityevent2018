import routes from './routes';
import rootReducer from './reducers';
import rootSaga from './sagas';
import { apiHandler, reactRender, pageRender } from 'react-redux-saga-server-side-render-helper';
import _ from 'lodash';

import App from './containers/App.jsx';


const appName = 'IF City Event';

export const appData = {
    routes,
    rootReducer,
    rootSaga,
    App
};

const pageConfig = {
    appName,
    getPageTitle: (route, data) => `${route ? (_.isFunction(route.pageTitle) ? route.pageTitle(data) : route.pageTitle) + ' - ' : ''}${appName}`,
    appData
};

const reactConfig = {
    next: pageRender(pageConfig),
    appData
};

const apiConfig = {
    next: reactRender(reactConfig),
    appData
};

export const appConfig = {
    next: apiHandler(apiConfig),
    appData
};
