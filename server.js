const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const path = require('path');

const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);

const port = 3661;

app.use('/scripts', express.static(path.join(__dirname, 'scripts')));
app.use('/styles', express.static(path.join(__dirname, 'styles')))

app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
}));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, function() {
    console.log(`Monter.gdpr running on ${port}\n`);
})