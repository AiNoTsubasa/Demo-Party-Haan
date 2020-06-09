const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');

const UserRouter = require('./routes/UserRouter');
const PartyRouter = require('./routes/PartyRouter');
const FileRouter = require('./routes/FileRouter');

const app = express();


const apiConfig = {
    host: process.env.API_HOST || 'localhost',
    port: process.env.API_PORT || 1780
};

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/user', UserRouter);
app.use('/api/party', PartyRouter);
app.use('/api/file', FileRouter);

const server = http.createServer(app);
server.listen(apiConfig, function () {
    const host = server.address().address;
    const port = server.address().port;
    console.log(`Api ready, listening at http://${host}:${port}/`);
});