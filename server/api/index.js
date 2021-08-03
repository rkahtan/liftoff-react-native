const router = require('express').Router()
const { models: { User }} = require('../db')
module.exports = router


//custom error handler in here to check token (once login page in /auth is over)
const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    //using token send in header to check authorization and to get user info
    req.user = await User.findByToken(token)
    //set user info on req.user
    next()
  } catch(error) {
    next(error)
  }
}

router.use('/workouts', requireToken, require('./workouts'))
router.use('/exercises', requireToken, require('./exercises'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})