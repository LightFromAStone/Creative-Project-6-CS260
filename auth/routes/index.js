var express = require('express');
var router = express.Router();
var expressSession = require('express-session');
var mongoose = require('mongoose'),
    User = mongoose.model('User');

var users = require('../controllers/users_controller');
console.log("before / Route");
router.get('/', function(req, res){
    console.log("/ Route");
//    console.log(req);
    console.log(req.session);
    
    User
    .find()
    .exec((error, users) => {
      const nutritionCount = users.reduce((runningTotal, user) => {
        return user.color === 'Nutrition Calculator' ? runningTotal + 1 : runningTotal
        }, 0)
        
        const pokemonCount = users.reduce((runningTotal, user) => {
        return user.color === 'Pokemon Simulator' ? runningTotal + 1 : runningTotal
        }, 0)
        
        const chatCount = users.reduce((runningTotal, user) => {
        return user.color === 'Simple Chat' ? runningTotal + 1 : runningTotal
        }, 0)

      // Repeate the above for each vote.
    
    if (req.session.user) {
      console.log("/ Route if user");
      res.render('index', {username: req.session.username,
                           msg:req.session.msg,
                           color:req.session.color,
                           nutritionCount,
                           pokemonCount,
                           chatCount});
                           //add three vote totals here
    } else {
      console.log("/ Route else user");
      req.session.msg = 'Access denied!';
      res.redirect('/login');
    }
    })
});
router.get('/user', function(req, res){
    console.log("/user Route");
    if (req.session.user) {
      res.render('user', {msg:req.session.msg});
    } else {
      req.session.msg = 'Access denied!';
      res.redirect('/login');
    }
});
router.get('/signup', function(req, res){
    console.log("/signup Route");
    if(req.session.user){
      res.redirect('/');
    }
    res.render('signup', {msg:req.session.msg});
});
router.get('/login',  function(req, res){
    console.log("/login Route");
    if(req.session.user){
      res.redirect('/');
    }
    res.render('login', {msg:req.session.msg});
});
router.get('/logout', function(req, res){
    console.log("/logout Route");
    req.session.destroy(function(){
      res.redirect('/login');
    });
  });
router.post('/signup', users.signup);
router.post('/user/update', users.updateUser);
router.post('/user/delete', users.deleteUser);
router.post('/login', users.login);
router.get('/user/profile', users.getUserProfile);


module.exports = router;