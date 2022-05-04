const express = require('express')
const router = express.Router()

const User = require('../models/db-helpers')

router.get('/', authenticated, async (req, res) => {

  const response = () => {
    req.user
    .then(user => {
      if (user.username == 'admin') {
        res.redirect('admin')
      }
      User.getUserData(user.id)
      .then(data => {
        res.render(
          'user-main', {
            name : user.username,
            data
          }
        )
      })
      .catch(err => console.log(err, 'Error with getting the data'))
    })
    .catch(err => console.log(err))
  }
  response()

 
})

router.post('/', (req, res) => {

  let data = req.body

  const insert = () => {
    req.user
    .then(user => {
      data.user_id = Number.parseInt(user.id, 10)
      User.addUserData(data)
      .then(response => {
        console.log(`${response} successfully added !`)
      })
      .catch(err => {
        console.log(err)
        res.status(200).json({ message: 'error'})
      })
    })
    .catch(err => {
      console.log(err)
    })
  }

  insert()

})

router.patch('/update', (req, res) => {
  
  let data = req.body

  const update = () => {
    req.user
    .then(user => {
      data.user_id = Number.parseInt(user.id, 10)
      User.updateUserData(user.id, data)
      .then(response => {
        if (response) {
          console.log('Changes were successfully made')
          res.redirect('/')
        } else {
          console.log('Record with that id not found')
        }
      })
      .catch(err => {
        console.log(err)
        res.status(200).json({ message: 'Error updating the record'})
      })
    })
    .catch(err => {
      console.log(err)
    })
  }

  update()
})

module.exports = router

function authenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next()
  } else {
    return res.redirect('/login')
  }
}
