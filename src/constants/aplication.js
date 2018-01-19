const dev = {
    appUrl: 'http://localhost',
    FBPageId: '144789742902364',
    apiURL: 'http://localhost',
    port: 3030
};

const prod = {
    appUrl: 'http://ifcityevent.com',
    FBPageId: '111526136320923',
    apiURL: 'http://api.ifcityevent.com',
    port: 80
};

export default {
    appName: 'IF City Event',
    FBPageId: '111526136320923',
    GAID: 'UA-112754571-1',
    ...prod,
    queries: {
        places: '&q=*&type=place&center=48.9166666667%2C24.7166666667&distance=10000&limit=200'
    },
    formats: {
        date: {
            system: 'YYYY-MM-DD'
        }
    }
};
