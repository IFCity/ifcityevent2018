import ListPage from '../containers/ListPage.jsx';
import DashboardPage from '../containers/DashboardPage.jsx';
import EventPage from '../containers/EventPage.jsx';
import AdminPage from '../containers/AdminPage.jsx';
import AuthorsPage from '../containers/AuthorsPage.jsx';
import { fetchEvents, fetchEvent } from '../api/events';
import { fetchCategories } from '../api/categories';
import {fetchAuthors} from "../api/authors";
import moment from "moment/moment";


const eventsLoadData = match => {
    let params = {};
    if (match && match.params.categoryid) {
        params.category = match.params.categoryid;
    }
    if (match && match.params.tagname) {
        params.tag = decodeURIComponent(match.params.tagname);
    }
    return Promise.all([fetchEvents(params), fetchCategories()]);
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
        pageTitle: () => 'Відкрий цікаві події Івано-Франківська'
    },
    {
        path: '/legacy',
        key: 'root',
        exact: true,
        component: ListPage,
        loadData: () => eventsLoadData(),
        getPreloadedState: data => eventsPreloadedState(data),
        pageTitle: () => 'Всі події'
    },
    {
        path: '/category/:categoryid',
        key: 'category',
        exact: true,
        component: ListPage,
        loadData: match => eventsLoadData(match),
        getPreloadedState: data => eventsPreloadedState(data),
        pageTitle: () => 'Категорія'
    },
    {
        path: '/event/:eventid',
        key: 'sport',
        exact: true,
        component: EventPage,
        loadData: match => eventLoadData(match),
        getPreloadedState: data => eventPreloadedState(data),
        pageTitle: data => data[0][0].data.name
    },
    {
        path: '/admin',
        key: 'admin',
        component: AdminPage,
        pageTitle: 'Адміністрування'
    },
    {
        path: '/authors',
        key: 'authors',
        exact: true,
        component: AuthorsPage,
        loadData: () => authorsLoadData(),
        getPreloadedState: data => authorsPreloadedState(data),
        pageTitle: () => 'Організатори'
    },
    {
        path: '/tags/:tagname',
        key: 'tags',
        exact: true,
        component: ListPage,
        loadData: match => eventsLoadData(match),
        getPreloadedState: data => eventsPreloadedState(data),
        pageTitle: () => 'Теги'
    },
    {
        path: '/:holiday/:categoryid',
        key: 'weekend',
        exact: false,
        component: ListPage,
        loadData: match => eventsLoadDataWeekend(match),
        getPreloadedState: data => eventsPreloadedState(data),
        pageTitle: () => `Вікенд (${moment().day(6).format('LL')} - ${moment().day(7).format('LL')})`
    },
    {
        path: '/:holiday',
        key: 'weekend',
        exact: false,
        component: ListPage,
        loadData: match => eventsLoadDataWeekend(match),
        getPreloadedState: data => eventsPreloadedState(data),
        pageTitle: () => `Вікенд (${moment().day(6).format('LL')} - ${moment().day(7).format('LL')})`
    }
];


export const mainMenuRoutes = [
    {
        path: '/category/film',
        title: 'Кіно'
    },
    {
        path: '/category/teatr',
        title: 'Театр'
    },
    {
        path: '/tags/%D0%BF%D1%96%D0%B4%D1%85%D0%BE%D0%B4%D0%B8%D1%82%D1%8C%20%D0%B4%D0%BB%D1%8F%20%D0%B4%D1%96%D1%82%D0%B5%D0%B9',
        title: 'Для дітей'
    },
    {
        path: '/tags/%D0%92%D0%B5%D0%BB%D0%B8%D0%BA%D0%B4%D0%B5%D0%BD%D1%8C-2018',
        title: 'Великдень 2018'
    },
    {
        path: '/legacy',
        title: 'Стара версія'
    },
];

export const categoryMenuRoutes = path => {
    path = path || 'category';
    return [
            {
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
