const express = require('express')
const router = express.Router()

router.get('/', notAuthenticated, (req, res) => {
  res.render('index')
})

module.exports = router

function notAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/user-main')
  } else {
    next()
  }
}