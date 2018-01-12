import ListPage from '../containers/ListPage.jsx';
import AdminPage from '../containers/AdminPage.jsx';
import { fetchEvents } from '../api/events';


export default [
    {
        path: '/',
        key: 'root',
        exact: true,
        component: ListPage,
        loadData: () => fetchEvents(),
        getPreloadedState: data => {
            let metadata = data[0].metadata || {};
            return {
                events: {
                    data: data[0].data || [],
                    metadata
                }}
        },
        pageTitle: 'Всі події'
    },
    {
        path: '/category/:categoryid',
        key: 'sport',
        exact: true,
        component: ListPage,
        loadData: (match) => fetchEvents(match && match.params.categoryid),
        getPreloadedState: data => {
            let metadata = data[0].metadata || {};
            return {
                events: {
                    data: data[0].data || [],
                    metadata
                }}
        },
        pageTitle: 'Події'
    },
    {
        path: '/admin',
        key: 'admin',
        component: AdminPage,
        loadData: () => fetchEvents(),
        getPreloadedState: data => {
            let metadata = data[0].metadata || {};
            return {
                events: {
                    data: data[0].data || [],
                    metadata
                }}
        },
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
    }
];
