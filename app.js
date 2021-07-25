var express             = require('express');
var path                = require('path');
var cookieParser        = require('cookie-parser');
var logger              = require('morgan');
var automovelRoute      = require('./routes/automovelRoute');
var motoristaRoute      = require('./routes/motoristaRoute');
var utilizacaoRoute      = require('./routes/utilizacaoRoute'); 
var mongoMiddleware     = require('./middleware/mongoMiddleware');

global.browser;
require ('dotenv').config();

var app = express();

mongoMiddleware.connect();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/automovel', automovelRoute);
app.use('/motorista', motoristaRoute);
app.use('/utilizacao', utilizacaoRoute);

app.use((req, res, next) =>{ 
    res.status(404);

    // respond with json
    if (req.accepts('json')) {
        res.send({ error: 'Not found' });
        return;
    }

    // respond with html page
    if (req.accepts('html')) {
      res.render('404', { url: req.url });
      return;
    }
  
    // default to plain-text. send()
    res.type('txt').send('Not found');
});

module.exports = app;
