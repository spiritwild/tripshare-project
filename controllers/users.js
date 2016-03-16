var mongoose = require('mongoose');
var User = mongoose.model('User');
var utils = require('../libs/utils');

exports.register = register;

function register(req, res) {
  var user = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    full_name: req.body.fullname,
    dob: req.body.dob,
    address: req.body.address,
    id_card: req.body.id_card,
    phone: req.body.phone
  };
  res.send(JSON.stringify(user));
}