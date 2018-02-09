import Express from 'express';
import { handleRender as defaultHandleRender } from 'react-redux-saga-server-side-render-helper';
import { appConfig } from './config';
import appSettings from './constants/aplication';

const handleRender = defaultHandleRender(appConfig);

const app = Express();
const port = appSettings.port;
app.use((req, res, next) => {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next();
});
app.use(Express.static('dist'));
app.use(handleRender);
app.listen(port);
