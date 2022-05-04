const express = require('express')
const router = express.Router()
const passport = require('passport')

const initializePassport = require('../passport-config')
initializePassport(passport)

router.get('/', notAuthenticated, (req, res) => {
  res.render('login')
})

router.post('/', passport.authenticate('local', {
  successRedirect: 'user-main',
  failureRedirect: 'login',
  failureFlash: true
}))


module.exports = router

function notAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/user-main')
  } else {
    next()
  }
}
