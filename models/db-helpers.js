//knex queries
const knex = require('knex')
const config = require('../knexfile')

const db = knex(config.development)

async function addUser(user) {
  const [id] = await db('user').insert(user)
  return user
}

function getAllUsers() {
  return db('user')
}

function getUserByUsername(username) {
  return db('user')
    .where({ username })
    .first()
}

function getUserById(id) {
  return db('user')
    .where({ id })
    .first()
}

function removeUser(id) {
  return db('user')
    .where({ id })
    .del()
}


async function addData(req) {
  try {
    await db('user_data').insert(req)
    return 'success'
  } catch (err) {
    console.log(err)
    return 'error'
  }

}

module.exports = {
  addUser,
  getAllUsers,
  getUserByUsername,
  getUserById,
  removeUser,
  addData
}
