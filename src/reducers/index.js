import { combineReducers } from 'redux';
import images from './imagesReducer';
import details from './detailsReducer';
import events from './eventsReducer';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
    images,
    details,
    events,
    routing: routerReducer
});

export default rootReducer;
