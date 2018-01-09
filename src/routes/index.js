import Events from '../views/events.jsx';
import ListPage from '../containers/ListPage.jsx';
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
    }
];
