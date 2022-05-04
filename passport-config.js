const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const User = require('./models/db-helpers')

function initialize(passport) {

  const authenticateUser = async (username, password, done) => {
    const user = await User.getUserByUsername(username)
    .then(user => {
      return user
    })
    .catch(error => {
      return error
    })
    if (user == null) {
      return done(null, false, { message: 'No user with that username' })
    }

    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user)
      } else {
        return done(null, false, { message: 'Password incorrect' })
      }
    } catch (err) {
      return done(err)
    }
  }
  
  passport.use(new LocalStrategy(authenticateUser))
  passport.serializeUser((user, done) => done(null, user.id ))
  passport.deserializeUser((id, done) => {
    return done(
      null,
      User.getUserById(id)
      .then(user => {
        return user
      })
      .catch(error => {
        return error
      })
      )
  })
}

module.exports = initialize


