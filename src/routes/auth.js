const express = require('express');
const passport = require('passport');
const { loginGoogle } = require('../controllers/authController');
const router = express.Router();


passport.serializeUser((user, done) => done(null, user))
passport.deserializeUser((user, done) => done(null, user))


/* /auth */

router.get('/login/google', passport.authenticate('google'))
router.get(
    '/google/callback', 
    passport.authenticate('google', {failureRedirect: '/user/login'}),
     loginGoogle)


module.exports = router;