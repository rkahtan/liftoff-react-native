const router = require('express').Router()
const { models: { User, Exercise }} = require('../db')
module.exports = router

//req.user = user

//get all exercises for a given user
router.get('/', async (req, res, next) => {
  try {
    const {id} = req.user
    const exercises = await Exercise.findAll({
      where: {
        userId: id
      }
    })
    res.json(exercises)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const {id} = req.user
    const exercise = await Exercise.create(req.body)
    const user = await User.findByPk(id)
    await user.addExercise(exercise)
    res.status(201).send(exercise)
    //add an exercise to the db AND ASSOCIATE IT TO USER
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const {id} = req.user
    const exercise = await Exercise.findByPk(req.params.id, {
      where: {
        userId: id
      }
    })
    res.status(201).send(exercise)
    //get a single exercise (single exercise page)
    //if the exercise's user matches - otherwise can't send that exercise to the user - will token check for that or nah
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const {id} = req.user
    const exercise = await Exercise.findByPk(req.params.id, {
      where: {
        userId: id
      }
    })
    res.send(await exercise.update(req.body))
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try { 
    const {id} = req.user
    const exercise = await Exercise.findByPk(req.params.id, {
      where: {
        userId: id
      }
    })
    await exercise.destroy()
    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
})