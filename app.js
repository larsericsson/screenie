var http = require('http');
var path = require('path');
var express = require('express');
var logfmt = require('logfmt');

var App = express();

App.use(logfmt.requestLogger());

App.configure(function() {
    App.set('port', process.env.PORT || 5000);
    App.set('x-powered-by', false);

    App.use(express.bodyParser());
    App.use(express.methodOverride());

    App.use(express.static(path.join(__dirname, 'public')));
});

http.createServer(App).listen(App.get('port'), function() {
	console.log('Started Wesual on port 5000');
});