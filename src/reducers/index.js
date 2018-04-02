import { combineReducers } from 'redux';
import events from './eventsReducer';
import event from './eventReducer';
import categories from './categoriesReducer';
import pages from './pagesReducer';
import users from './usersReducer';
import authorization from './authorizationReducer';
import aggregation from './aggregationReducer';
import mostviewed from './mostviewedReducer';
import child from './childReducer';
import promo from './promoReducer';
import attention from './attentionReducer';
import authors from './authorsReducer';
import { routerReducer } from 'react-router-redux';


const rootReducer = combineReducers({
    events,
    event,
    categories,
    pages,
    users,
    authorization,
    aggregation,
    mostviewed,
    child,
    promo,
    attention,
    authors,
    routing: routerReducer
});

export default rootReducer;
