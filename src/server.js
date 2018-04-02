import Express from 'express';
import { handleRender as defaultHandleRender } from './ssr/helper';
import { appConfig } from './config';
import appSettings from './constants/aplication';

var secure = require('express-force-https');

var fs = require('fs');
var http = require('http');
var https = require('https');

var path = require('path');

var privateKey  = fs.readFileSync('./dist/cert/private.key');
var certificate = fs.readFileSync('./dist/cert/server.crt');
var bundle = fs.readFileSync('./dist/cert/ca_bundle.crt');

var credentials = {key: privateKey, cert: certificate, ba: bundle};

const handleRender = defaultHandleRender(appConfig);

const app = Express();
//var httpsRedirect = require('express-https-redirect');
//app.use('/', httpsRedirect());
/* app.use((req, res, next) => {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next();
}); */
app.use(Express.static('dist'));
app.use(handleRender);
// app.listen(port);




// your express configuration here

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(80);
httpsServer.listen(443);

