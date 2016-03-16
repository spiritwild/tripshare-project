var mongoose = require('mongoose');
var User = mongoose.model('User');
var utils = require('../libs/utils');

exports.register = register;

function register(req, res) {
  var user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    full_name: req.body.fullname,
    dob: req.body.dob,
    address: req.body.address,
    id_card: req.body.id_card,
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