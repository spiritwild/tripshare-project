var usersController = require('./controllers/users');

module.exports = function (app, passport) {
  app.get('/', function (req, res) {
    res.render('index');
  })

  app.get('/users/register', usersController.getRegister);
  app.post('/users/register', usersController.postRegister);

  app.get('/users/login', usersController.getLogin);
  app.post('/users/login', passport.authenticate('local', {
    failureRedirect: '/users/login',
    failureFlash: 'Invalid username or password'
  }), usersController.session);

  app.get('/users/logout', usersController.logout);

  app.get('/users/forgot-password', usersController.getForgotPassword);
  app.post('/users/forgot-password', usersController.postForgotPassword);

  app.get('/users/edit-profile', usersController.getEditProfile);
  app.post('/users/edit-profile', usersController.postEditProfile);

  // catch 404 and forward to error handler
  app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // development error handler
// will print stacktrace
  if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err
      });
    });
  }

// production error handler
// no stacktraces leaked to user
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });
}