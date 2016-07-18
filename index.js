var express = require('express');
var fs = require('fs');
var secrets = require('./config/secrets');
var app = express();
var passport = require ('passport');

// Bootstrap models
fs.readdirSync(__dirname + '/models').forEach(function(file) {
  if(~file.indexOf('.js')) require(__dirname + '/models/' + file);
});

var isDev = process.env.NODE_ENV === 'development';

require('./config/passport')(passport);

// Bootstrap application settings
require('./config/express')(app, passport);

// Bootstrap routes
require('./config/routes')(app, passport);

app.listen(app.get('port'));









