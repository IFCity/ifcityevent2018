import { combineReducers } from 'redux';
import images from './imagesReducer';
import details from './detailsReducer';
import events from './eventsReducer';
import pages from './pagesReducer';
import authorization from './authorizationReducer';
import aggregation from './aggregationReducer';
import { routerReducer } from 'react-router-redux';


const rootReducer = combineReducers({
    images,
    details,
    events,
    pages,
    authorization,
    aggregation,
    routing: routerReducer
});

export default rootReducer;
