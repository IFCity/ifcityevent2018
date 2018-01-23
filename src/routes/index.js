import ListPage from '../containers/ListPage.jsx';
import EventPage from '../containers/EventPage.jsx';
import AdminPage from '../containers/AdminPage.jsx';
import { fetchEvents, fetchEvent } from '../api/events';
import { fetchCategories } from '../api/categories';

const eventsLoadData = match => {
    return Promise.all([fetchEvents(match && match.params.categoryid ? {category: match.params.categoryid} : null), fetchCategories()]);
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

export default [
    {
        path: '/',
        key: 'root',
        exact: true,
        component: ListPage,
        loadData: () => eventsLoadData(),
        getPreloadedState: data => eventsPreloadedState(data),
        pageTitle: () => 'Всі події'
    },
    {
        path: '/category/:categoryid',
        key: 'sport',
        exact: true,
        component: ListPage,
        loadData: match => eventsLoadData(match),
        getPreloadedState: data => eventsPreloadedState(data),
        pageTitle: () => 'Категорія'
    },
    {
        path: '/event/:eventid/:trname',
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
];


export const mainMenuRoutes = [
    {
        path: '/',
        title: 'Всі події'
    }, {
        path: '/category/film',
        title: 'Кіно'
    }, {
        path: '/category/concert',
        title: 'Концерти'
    }, {
        path: '/category/sport',
        title: 'Спорт'
    }, {
        path: '/category/teatr',
        title: 'Театр'
    }, {
        path: '/category/exibition',
        title: 'Виставки'
    }, {
        path: '/category/disco',
        title: 'Клуб'
    }, {
        path: '/category/not_set',
        title: 'Масові заходи'
    }, {
        path: '/category/attention',
        title: 'Увага!'
    }, {
        path: '/category/discounts',
        title: 'Акції та знижки'
    }
];

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
