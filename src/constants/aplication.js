const dev = {
    appUrl: '//localhost',
    FBPageId: '144789742902364',
    apiURL: 'http://localhost',
    port: 3030,
    parse: {
        url: 'https://parseapi.back4app.com',
        appId: 'iGXRBoP0RqRMynK8SjSO5kGz5HapzWuKSCelNOQU',
        apiKey: 'XJNg2oiM0ikbYUnvHysKuUpd5f8tBBiZ3XoIPnhf',
        userName: 'gzoreslav',
        password: 'adminka',
        session: '1'
    }
};

const prod = {
    appUrl: '//ifcityevent.com',
    FBPageId: '111526136320923',
    apiURL: 'http://api.ifcityevent.com',
    port: 80,
    parse: {
        url: 'https://parseapi.back4app.com',
        appId: 'UEHkmoCk9kBV65FyInmWtuieGNDljEycJDROgxeS',
        apiKey: '0rBZ8XMzhINiDYcjKeyoMFQbHywJs1LfhLf4Q81r',
        userName: 'gzoreslav',
        password: 'adminka',
        session: '1'
    }
};

export default {
    appName: 'IFCityEvent',
    GAID: 'UA-112754571-1',
    ...prod,
    queries: {
        places: '&q=*&type=place&center=48.9166666667%2C24.7166666667&distance=10000&limit=200&fields=name,link,cover'
    },
    formats: {
        date: {
            system: 'YYYY-MM-DD'
        }
    }
};
