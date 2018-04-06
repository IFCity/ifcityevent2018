import ListPage from '../containers/ListPage.jsx';
import DashboardPage from '../containers/DashboardPage.jsx';
import EventPage from '../containers/EventPage.jsx';
import AdminPage from '../containers/AdminPage.jsx';
import AuthorsPage from '../containers/AuthorsPage.jsx';
import AddEventPage from '../containers/AddEventPage.jsx';
import TermsPage from '../containers/TermsPage.jsx';
import { fetchEvents, fetchEvent } from '../api/events';
import { fetchCategories } from '../api/categories';
import {fetchAuthors} from "../api/authors";

import _ from 'lodash';


const eventsLoadData = match => {
    let params = {};
    if (match && match.params.categoryid) {
        params.category = match.params.categoryid;
    }
    if (match && match.params.tagname) {
        params.tag = decodeURIComponent(match.params.tagname);
    }
    return Promise.all([fetchEvents(), fetchCategories()]);
};

const eventsLoadDataWeekend = match => {
    let params = {
        weekend: true
    };
    if (match && match.params.categoryid) {
        params.category = match.params.categoryid;
    }
    return Promise.all([fetchEvents(params), fetchCategories()]);
};

const eventsPreloadedState = data => {
    return {
        events: {
            data: data[0][0].data || [],
            metadata: data[0][0].metadata || {}
        },
        categories: {
            data: data[0][1].data || [],
            metadata : data[0][1].metadata || {}
        }
    }
};

const eventLoadData = match => {
    return Promise.all([fetchEvent(match && match.params.eventid), fetchCategories()]);
};

const eventPreloadedState = data => {
    return {
        event: {
            data: data[0][0].data || [],
            metadata: data[0][0].metadata || {}
        },
        categories: {
            data: data[0][1].data || [],
            metadata : data[0][1].metadata || {}
        }
    }
};

const authorsLoadData = () => {
    return fetchAuthors();
};

const authorsPreloadedState = data => {
    return {
        authors: {
            data: data[0].data || [],
            metadata: data[0].metadata || {}
        }
    }
};

export default [
    {
        path: '/',
        key: 'dashboard',
        exact: true,
        component: DashboardPage,
        loadData: () => eventsLoadData(),
        getPreloadedState: data => eventsPreloadedState(data),
        pageTitle: () => 'IFCityEvent - Відкрий цікаві події Івано-Франківська'
    },
    {
        path: '/search',
        key: 'root',
        exact: true,
        component: ListPage,
        loadData: () => eventsLoadData(),
        getPreloadedState: data => eventsPreloadedState(data),
        pageTitle: () => 'Всі події - IFCityEvent'
    },
    {
        path: '/legacy',
        key: 'root',
        exact: true,
        component: ListPage,
        loadData: () => eventsLoadData(),
        getPreloadedState: data => eventsPreloadedState(data),
        pageTitle: () => 'Всі події - IFCityEvent'
    },
    {
        path: '/category/:categoryid',
        key: 'category',
        exact: true,
        component: ListPage,
        loadData: match => eventsLoadData(match),
        getPreloadedState: data => eventsPreloadedState(data),
        pageTitle: (data, match) => {
            const category = _(data[0][1].data)
                .filter(item => item.id === match.params.categoryid)
                .value()[0].name;
            return `${category} - IFCityEvent`;
        }
    },
    {
        path: '/event/:eventid',
        key: 'sport',
        exact: true,
        component: EventPage,
        loadData: match => eventLoadData(match),
        getPreloadedState: data => eventPreloadedState(data),
        pageTitle: data => `${data[0][0].data.name} - IFCityEvent`
    },
    {
        path: '/admin',
        key: 'admin',
        component: AdminPage,
        pageTitle: 'Адміністрування - IFCityEvent'
    },
    {
        path: '/authors',
        key: 'authors',
        exact: true,
        component: AuthorsPage,
        loadData: () => authorsLoadData(),
        getPreloadedState: data => authorsPreloadedState(data),
        pageTitle: () => 'Організатори - IFCityEvent'
    },
    {
        path: '/tags/:tagname',
        key: 'tags',
        exact: true,
        component: ListPage,
        loadData: match => eventsLoadData(match),
        getPreloadedState: data => eventsPreloadedState(data),
        pageTitle: (data, match) => `Пошук за тегом "${decodeURIComponent(match.params.tagname)}" - IFCityEvent`
    },
    {
        path: '/docs/addevent',
        key: 'addevent',
        exact: true,
        component: AddEventPage,
        pageTitle: () => 'Як додати подію - IFCityEvent'
    },
    {
        path: '/docs/terms',
        key: 'terms',
        exact: true,
        component: TermsPage,
        pageTitle: () => 'Умови використання - IFCityEvent'
    }
];


export const mainMenuRoutes = [
    {
        path: '/search',
        title: ' Пошук',
        icon: 'search'
    },
    {
        path: '/category/film',
        title: 'Кіно'
    },
    {
        path: '/category/teatr',
        title: 'Театр'
    },
    {
        path: `/tags/${encodeURIComponent('підходить для дітей')}`,
        title: 'Для дітей'
    },
    {
        path: `/tags/${encodeURIComponent('Великдень-2018')}`,
        title: 'Великдень'
    },
    {
        path: `/tags/${encodeURIComponent('День Матері 2018')}`,
        title: 'День Матері'
    },
];

export const categoryMenuRoutes = path => {
    path = path || 'category';
    return [
            {
                path: `/search`,
                title: 'Всі події'
            }, {
                path: `/${path || ''}/film`,
                title: 'Кіно'
            }, {
                path: `/${path || ''}/concert`,
                title: 'Концерти'
            }, {
                path: `/${path || ''}/sport`,
                title: 'Спорт'
            }, {
                path: `/${path || ''}/teatr`,
                title: 'Театр'
            }, {
                path: `/${path || ''}/exibition`,
                title: 'Виставки'
            }, {
                path: `/${path || ''}/disco`,
                title: 'Клуб'
            }, {
                path: `/${path || ''}/not_set`,
                title: 'Масові заходи'
            }, {
                path: `/${path || ''}/attention`,
                title: 'Увага!'
            }, {
                path: `/${path || ''}/discounts`,
                title: 'Акції та знижки'
            }
        ];
};

export const adminMenuRoutes = [
    {
        path: '/admin/aggregation',
        title: 'Імпорт подій з Facebook'
    }, {
        path: '/admin/events',
        title: 'Події'
    }, {
        path: '/admin/pages',
        title: 'Fecebook-сторінки'
    }, {
        path: '/admin/categories',
        title: 'Категорії'
    }, {
        path: '/admin/users',
        title: 'Користувачі'
    }, {
        path: '/admin/text',
        title: 'Текстовий парсер'
    }
];
