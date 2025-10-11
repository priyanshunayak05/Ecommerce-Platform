const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');


//to show the form of Signup
router.get('/register', (req, res) => {
    res.render('auth/signup');
});


//actually register the user in DB
router.post('/register', async (req, res) => {
    try {
  let {username, email, password,role} = req.body;
  const user=new User({username, email,role})
  const newUser=await User.register(user, password );
//   res.redirect('/login');
    req.login(newUser, function(err) {
        if (err) { return next(err); }
        req.flash('success', 'Welcome to the Shopping App!');
        return res.redirect('/products');
      })   

}
catch (e) {
    req.flash('error', e.message);
    res.redirect('/signup');
}
}); 


//to get login form
router.get('/login', (req, res) => {
    res.render('auth/login');
});

//to actually login the user via the Db
router.post('/login',
     passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true, 
}), (req, res) => {
    req.flash('success', 'Welcome Back!');
    res.redirect('/products');
});

// to logout the user
router.get('/logout', (req, res) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        req.flash('success', 'Logged you out!');
        res.redirect('/products');
    });
});

module.exports = router;