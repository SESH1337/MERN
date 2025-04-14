const express = require('express')
const database = require('./connect')
const ObjectId = require('mongodb').ObjectId
const bcrypt = require('bcrypt')

let userRoutes = express.Router()
const SALT_ROUNDS = 6

// #1 - Retrieve All   // მოაქვს ყველა data მონგოდან !
// https:localhost:3000/posts
userRoutes.route('/users').get(async (request, response) => {
  let db = database.getDb()
  let data = await db.collection('users').find({}).toArray()

  if (data.length > 0) {
    response.json(data)
  } else {
    throw new Error('Data was not found')
  }
})

// #2 - Retrieve One  // მოაქვს მხოლოდ ცალკეული data ID-ის მიხედვით !

userRoutes.route('/users/:id').get(async (request, response) => {
  let db = database.getDb()
  let data = await db
    .collection('users')
    .findOne({ _id: new ObjectId(request.params.id) })

  if (Object.keys(data).length > 0) {
    response.json(data)
  } else {
    throw new Error('Data was not found')
  }
})

// #3 - Create One  // ქმნის ახალ data-ს მხოლოდ ერთს რათქმაუნდა
userRoutes.route('/users').post(async (request, response) => {
  let db = database.getDb()

  const takenEmail = await db
    .collection('users')
    .findOne({ email: request.body.email })

  if (takenEmail) {
    response.json({ message: 'The email already taken' })
  } else {
    const hash = await bcrypt.hash(request.body.password, SALT_ROUNDS)

    let mongoObject = {
      name: request.body.name,
      email: request.body.email,
      password: hash,
      joinDate: new Date(),
      posts: [],
    }
    let data = await db.collection('users').insertOne(mongoObject)

    response.json(data)
  }
})

// #4 - Update One  // ანახლებს data-ს მხოლოდ ერთს !

userRoutes.route('/users/:id').put(async (request, response) => {
  let db = database.getDb()

  let hash = await bcrypt.hash(request.body.password, SALT_ROUNDS) // ✅ პაროლის დაჰეშვა

  let mongoObject = {
    $set: {
      name: request.body.name,
      email: request.body.email,
      password: hash, // ✅ შევინახოთ დაჰეშილი პაროლი
      joinDate: request.body.joinDate,
      posts: request.body.posts,
    },
  }

  let data = await db
    .collection('users')
    .updateOne({ _id: new ObjectId(request.params.id) }, mongoObject)

  response.json(data)
})

// #5 - Delete One  // შლის კონკრეტულ data-ს id-ის მიხედვით !

userRoutes.route('/users/:id').delete(async (request, response) => {
  let db = database.getDb()
  let data = await db
    .collection('users')
    .deleteOne({ _id: new ObjectId(request.params.id) })
  response.json(data)
})

// #6 - Login // user-ის შესვლა landing-ზე
userRoutes.route('/users/login').post(async (request, response) => {
  let db = database.getDb()

  const user = await db
    .collection('users')
    .findOne({ email: request.body.email })

  if (user) {
    let conformation = await bcrypt.compare(
      request.body.password,
      user.password
    )
    if (conformation) {
      response.json({ success: true, user })
    } else {
      // ეს ნიშნავს მაილი სწორია მაგრამ პაროლი არა
      response.json({ success: false, message: 'inccorect password' })
    }
  } else {
    response.json({ success: false, message: 'user not found' })
  }
})

// Export For Frontend:

module.exports = userRoutes
