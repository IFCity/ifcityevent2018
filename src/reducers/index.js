import { combineReducers } from 'redux';
import events from './eventsReducer';
import event from './eventReducer';
import categories from './categoriesReducer';
import pages from './pagesReducer';
import users from './usersReducer';
import authorization from './authorizationReducer';
import aggregation from './aggregationReducer';
import { routerReducer } from 'react-router-redux';


const rootReducer = combineReducers({
    events,
    event,
    categories,
    pages,
    users,
    authorization,
    aggregation,
    routing: routerReducer
});

export default rootReducer;
