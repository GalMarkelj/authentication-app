const express = require('express')
const router = express.Router()

const User = require('../models/db-helpers')


router.get('/', authenticated, async (req, res) => {

  const response = () => {
    req.user
    .then(user => {
      if(user.username == 'admin') {
        User.getAllUsers()
        .then(allUsers => {
          res.render('admin', { admin: 'Admin', allUsers })
        })
        .catch(err => {
          console.log(err, 'Cannot get the users')
        })
        
      } else {
        console.log('Access denied !')
        res.redirect('user-main')
      }
    })
    .catch(err => console.log(err))
  }
  response()

})

router.delete('/del', (req, res) => {
  console.log(req.body.delete)

  User.removeUser(req.body.delete)
  .then(num => {
    if (num) {
      console.log('User deleted')
      res.redirect('admin')
    } else {
      console.log('User with that ID doesnt exits')
    }
  })
  .catch(err => {
    console.log(err)
  })
})


module.exports = router
function authenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next()
  } else {
    return res.redirect('/login')
  }
}
