var mongoose = require('mongoose');
var User = mongoose.model('User');
var utils = require('../../libs/utils');

exports.load = function (req, res, next, id) {
  var options = {
    criteria: {_id: id}
  };
  User.load(options, function (err, user) {
    if (err) return next(err);
    if (!user) return next(new Error('Failed to load User ' + id));
    req.profile = user;
    next();
  });
}
exports.postRegister = function (req, res) {
  var user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    fullName: req.body.fullname,
    dob: req.body.dob,
    address: req.body.address,
    idCard: req.body.id_card,
    phone: req.body.phone
  });
  user.save(function (err) {
    if (err) {
      return res.render('users/register', {
        error: utils.errors(err.errors),
        user: user,
        title: "Register"
      })
    }
    req.logIn(user, function (err) {
      if (err) req.flash('info', 'Sorry! We are not able to log you in!');
      return res.redirect('/');
    });
  })
}

exports.getRegister = function (req, res) {
  res.render('users/register', {title: "Register"});
}

exports.getLogin = function (req, res) {
  res.render('users/login', {title: "Login"});
}

exports.getForgotPassword = function (req, res) {
  res.render('users/forgot-password');
}

exports.signin = function (req, res) {
}

exports.postForgotPassword = function (req, res) {
}

/**
 * Logout
 */

exports.logout = function (req, res) {
  req.logout();
  res.redirect('/users/login');
};

/**
 * Session
 */

exports.session = login;

/**
 * Login
 */

function login(req, res) {
  var redirectTo = req.session.returnTo ? req.session.returnTo : '/';
  delete req.session.returnTo;
  res.redirect(redirectTo);
};

exports.getEditProfile = function (req, res) {
  var options = {
    criteria: {username: req.user.username},
    select: 'fullName username email dob address phone idCard'
  }
  User.load(options, function (err, user) {
    if (err) {
      return res.render('500')
    }
    console.log('aaaaaa');

    return res.render('users/profile', {user: user})
  })
  //res.render('users/profile', {user: req.user});
}

exports.postEditProfile = function (req, res) {

}
