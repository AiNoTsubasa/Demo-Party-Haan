const express = require('express');
const cors = require('cors');
const http = require('http');
const httpProxy = require('http-proxy');
const cookieParser = require('cookie-parser');
const authorization = require('./utils/authorize');
const handleFileRequest = require('./utils/fileRequest');
const decodeToken = require('./utils/decodeToken');
const Auth = require('./utils/Auth');

const LoginRouter = require('./routes/LoginRouter');
const RegisterRouter = require('./routes/RegisterRouter');
const LogoutRouter = require('./routes/LogoutRouter');

const app = express();

const rvpConfig = {
	host: process.env.RVP_HOST || 'localhost',
    port: process.env.RVP_PORT || 80
};

const platformConfig = {
    host: process.env.PLATFORM_HOST || 'localhost',
    port: process.env.PLATFORM_PORT || 3000
};

const apiConfig = {
    host: process.env.API_HOST || 'localhost',
    port: process.env.API_PORT || 1780
};



const platformServer = new httpProxy.createProxyServer({
    target: platformConfig
});

const apiServer = new httpProxy.createProxyServer({
    target: apiConfig
});

app.use(cors());
app.use(cookieParser());

app.all("/api*", authorization, function (req, res) {
    apiServer.web(req, res);
});

app.use('/login', LoginRouter);
app.use('/logout', LogoutRouter);
app.use('/register', RegisterRouter);

app.get('/uploaded/:fileName', handleFileRequest);
app.get('/decodeToken/:token', decodeToken);

app.get("/*", function (req, res) {
    const auth = new Auth(req.cookies);
    if( !auth.isLoggedIn() ) {
        res.redirect('/login');
    } else {
        platformServer.web(req, res);
    }
});

console.log("Servers configuration: ");
console.log("API: ", JSON.stringify(apiConfig));
console.log("Platform: ", JSON.stringify(platformConfig));

const server = http.createServer(app);
server.listen(rvpConfig, function () {
    const host = server.address().address;
    const port = server.address().port;
    console.log(`Server ready, listening at http://${host}:${port}/`);
});