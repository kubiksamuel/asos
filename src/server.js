require('dotenv').config()

const express = require('express')
const server = express()
const mongoose = require('mongoose')

const port = process.env.PORT;
const databaseUrl = process.env.DATABASE_URL

mongoose.connect(databaseUrl, {    
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

server.use(express.json())

const userRouter = require('./routes/users')
const foodRouter = require('./routes/foods')
const authRouter = require('./routes/auth');
const goalRouter = require('./routes/goal')
const storedWorkoutRouter = require('./routes/storedWorkouts')
const exerciseRouter = require('./routes/exercise')
const workoutRouter = require('./routes/workout')
const mealPlanRouter = require('./routes/mealPlan')

server.use('/users', userRouter)
server.use('/auth', authRouter);
server.use('/storedWorkouts', storedWorkoutRouter)
server.use('/exercise', exerciseRouter)
server.use('/workout', workoutRouter)
server.use('/goals', goalRouter)
server.use('/foods', foodRouter)
server.use('/mealPlan', mealPlanRouter)

server.listen(port, () => console.log('Server Started'))