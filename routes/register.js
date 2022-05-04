const express = require('express')
const router = express.Router()

const { check, validationResult } = require('express-validator')
const bcrypt = require('bcrypt')

const User = require('../models/db-helpers')


router.get('/', notAuthenticated, (req, res) => {
  res.render('register')
})

router.post('/', [

  check('username', 'Username should be at least 3 characters')
    .exists()
    .isLength({ min : 3 }),
  check('email', 'Email is not valid')
    .isEmail()
    .normalizeEmail(),
  check('password', 'Password must be at least 8 characters long')
    .isLength({ min : 3 })
  .custom(async (typedDeclaration, {req}) => {

    const password = req.body.password
    const password_rpt = req.body.password_rpt
    if (password !== password_rpt) {
      throw new Error('Passwords do not match')
    }

  })

], async (req, res) => {

  const errors = validationResult(req)
  
  try {
    const hashedPassword =  await bcrypt.hash(req.body.password, 10)

    if (errors.isEmpty()) {
      User.addUser({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword
      })
      .then(user => {
        console.log(`User ${user.username} sucessfully added`)
        res.redirect('login')
      })
      .catch((error) => {
        console.log(error)
        res.status(500).json({ message: 'Cannot add the user' })
      })
    } else {
      const error = errors.array()
      res.render('register', { error })
    }
  } catch (err) {
    res.redirect('register')
    console.log(err)
  }

})


module.exports = router

function notAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/user-main')
  } else {
    next()
  }
}