import { combineReducers } from 'redux';
import images from './imagesReducer';
import details from './detailsReducer';
import events from './eventsReducer';
import categories from './categoriesReducer';
import pages from './pagesReducer';
import users from './usersReducer';
import authorization from './authorizationReducer';
import aggregation from './aggregationReducer';
import { routerReducer } from 'react-router-redux';


const rootReducer = combineReducers({
    images,
    details,
    events,
    categories,
    pages,
    users,
    authorization,
    aggregation,
    routing: routerReducer
});

export default rootReducer;
