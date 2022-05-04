const express = require('express')
const router = express.Router()

router.get('/', authenticated, async (req, res) => {

  const response = () => {
    req.user
    .then(user => {
      res.render('user-main', {
        name: user.username
      })
    })
    .catch(err => err)
  }

  response()
})

module.exports = router

function authenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next()
  } else {
    return res.redirect('/login')
  }
}