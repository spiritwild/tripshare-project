var express = require('express');
var router = express.Router();
var userController = require('../controllers/users');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/register', function (req, res, next) {
  res.render('users/register', {title: 'Register'})
})

router.get('/login', function (req, res, next) {
  res.render('users/login', {title: "Login"});
})

router.get('/forgot-password', function (req, res, next) {
  res.render('users/forgot-password', {title: 'Forgot password'});
});

router.post('/register', userController.register);

module.exports = router;
