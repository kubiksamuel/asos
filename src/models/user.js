const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');
const {Schema} = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
      type: String,
      required: true,
      unique: true
    },
    foods: [
        {
            type: Schema.Types.ObjectId,
            ref: "Food"
        }
    ],
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    },
    goals: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Goal'
      }
    ],
    storedWorkouts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "StoredWorkout"
        }
    ],
    workouts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Workout"
        }
    ],
    age: {
      type: Number,
      required: true
    },
    height: {
      type: Number,
      required: true
    },
    weight: {
      type: Number,
      required: true
    },
    gender: {
      type: String,
      enum: ['female', 'male']
    }
  },
  { timestamps: true }
)

// Hash the password before saving it to the database
userSchema.pre('save', async function (next) {
  const user = this
  if (!user.isModified('password')) return next()

  try {
    const salt = await bcrypt.genSalt()
    user.password = await bcrypt.hash(user.password, salt)
    next()
  } catch (error) {
    return next(error)
  }
});

// Compare the given password with the hashed password in the database
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password)
};

module.exports = mongoose.model('User', userSchema)