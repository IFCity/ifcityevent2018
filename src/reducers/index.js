import { combineReducers } from 'redux';
import events from './eventsReducer';
import event from './eventReducer';
import categories from './categoriesReducer';
import pages from './pagesReducer';
import users from './usersReducer';
import authorization from './authorizationReducer';
import aggregation from './aggregationReducer';
import child from './childReducer';
import promo from './promoReducer';
import attention from './attentionReducer';
import authors from './authorsReducer';
import tagsLookup from './tagsLookupReducer';
import { routerReducer } from 'react-router-redux';


const rootReducer = combineReducers({
    events,
    event,
    categories,
    pages,
    users,
    authorization,
    aggregation,
    child,
    promo,
    attention,
    authors,
    tagsLookup,
    routing: routerReducer
});

export default rootReducer;
