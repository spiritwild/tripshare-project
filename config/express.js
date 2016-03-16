var express = require('express'),
  session = require('express-session'),
  path = require('path'),
  favicon = require('serve-favicon'),
  morgan = require('morgan'),
  cookieParser = require('cookie-parser'),
  cookieSession = require('cookie-session'),
  bodyParser = require('body-parser'),
  csrf = require('csurf'),
  flash = require('connect-flash'),
  winston = require('winston');

module.exports = function (app, passport) {

  // view engine setup
  app.set('views', path.join(__dirname, '/../app/views'));
  app.set('view engine', 'jade');

  // uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
  app.use(morgan('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(cookieParser());
  app.use(cookieSession({secret: 'secret'}));

  app.use(cookieParser());
  app.use(cookieSession({secret: 'secret'}));

  app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: '1234890sdlkjfu02'
  }));

  app.use(express.static(path.join(__dirname, '/../public')));

  app.use(csrf());
  app.use(function (req, res, next) {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    res.locals.csrf_token = req.csrfToken();
    res.locals.req = req;
    next();
  });

  //app.use(function (req, res, next) {
  //  var err = new Error('Not Found');
  //  err.status = 404;
  //  next(err);
  //});
// use passport session
  app.use(passport.initialize());
  app.use(passport.session());

  // connect flash for flash messages - should be declared after sessions
  app.use(flash());


//
}