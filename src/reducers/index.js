import { combineReducers } from 'redux';
import images from './imagesReducer';
import details from './detailsReducer';
import events from './eventsReducer';
import authorization from './authorizationReducer';
import aggregation from './aggregationReducer';
import { routerReducer } from 'react-router-redux';


const rootReducer = combineReducers({
    images,
    details,
    events,
    authorization,
    aggregation,
    routing: routerReducer
});

export default rootReducer;
