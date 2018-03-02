import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { matchPath } from 'react-router-dom';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';


import { configureStore } from './store';

export function handleRender(config) {

    return function(req, res) {
        config.next(req, res);
    }
}

export function apiHandler(config)  {

    return function(req, res) {
        let selectedRoutes = [];

        config.appData.routes.some(route => {
            const match = matchPath(req.url, route);
            if (match) {
                selectedRoutes.push({r: route, m: match});
            }
            return match;
        });

        if (!selectedRoutes.length) {
            config.next(req, res);
        } else {
            let promises = [];
            selectedRoutes
                .map(({r, m}) => {
                    if (r.loadData) {
                        promises.push(r.loadData(m));
                    }
                });
            Promise.all(promises)
                .then(data => {
                    config.next(req, res, selectedRoutes[selectedRoutes.length - 1].r, data);
                })
                .catch(ex => {
                    config.next(req, res, selectedRoutes[selectedRoutes.length - 1].r, ex);
                })
        }
    }
}

export function reactRender(config) {

    return function (req, res, route, data) {
        let preloadedState = route && route.getPreloadedState ? route.getPreloadedState(data) : {};
        const store = configureStore({preloadedState, ...config.appData});
        const context = {};

        const html = ReactDOMServer.renderToString(
            <Provider store={store}>
                <StaticRouter
                    location={req.url}
                    context={context}
                >
                    <config.appData.App />
                </StaticRouter>
            </Provider>
        );

        const finalState = store.getState();

        res.send(config.next(html, finalState, route, data));
    }
}

export function pageRender(config) {

    return function(html, preloadedState, route, data) {
        return `
            <!doctype html>
            <html>
                <head>
                    <meta http-equiv="Content-type" content="text/html; charset=utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1">
                    <title>${config.getPageTitle(route, data)}</title>
                    <link href="/main.css" rel="stylesheet">
                    <link href="/vendor.css" rel="stylesheet">
                </head>
                <body>
                    <div id="root">${html}</div>
                    <script>
                        // WARNING: See the following for security issues around embedding JSON in HTML:
                        // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
                        window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
                    </script>
                    <script>
                        !function(f,b,e,v,n,t,s)
                        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                        n.queue=[];t=b.createElement(e);t.async=!0;
                        t.src=v;s=b.getElementsByTagName(e)[0];
                        s.parentNode.insertBefore(t,s)}(window,document,'script',
                        'https://connect.facebook.net/en_US/fbevents.js');
                         fbq('init', '349141378826255'); 
                        fbq('track', 'PageView');
                    </script>
                    <noscript>
                        <img height="1" width="1" src="https://www.facebook.com/tr?id=349141378826255&ev=PageView&noscript=1"/>
                    </noscript>
                    <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>
                    <script src="/client.bundle.js"></script>
                </body>
            </html>
            `;
    }
}
