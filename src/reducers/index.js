import { combineReducers } from 'redux';
import images from './imagesReducer';
import details from './detailsReducer';
import events from './eventsReducer';
import authorization from './authorizationReducer';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
    images,
    details,
    events,
    authorization,
    routing: routerReducer
});

export default rootReducer;
