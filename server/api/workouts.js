const router = require('express').Router()
const { models: { User, Workout, Exercise }} = require('../db')
module.exports = router

//req.user = user

router.get('/', async (req, res, next) => {
  try {
    const {id} = req.user
    const workouts = await Workout.findAll({
      where: {
        userId: id
      },
      include: 
        [{model: Exercise}]
    })
    res.json(workouts)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const {id} = req.user
    const workout = await Workout.create(req.body)
    const user = await User.findByPk(id)
    await user.addWorkout(workout)
    res.status(201).send(workout)
    //add a workout to the db AND ASSOCIATE IT TO USER
    //associate exercises to workout
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    //get a single workout (single workout page)
    //eager load with exercises
    const {id} = req.user
    const workout = await Workout.findByPk(req.params.id, {
      //find workout by associated user id
      where: {
        userId: id
      },
      //include workout's exercises 
      include: 
        [{model: Exercise}]
    })
    res.status(201).send(workout)
  } catch (err) {
    next(err)
  }
})


//send exercises with the updated!!!
router.put('/:id', async (req, res, next) => {
  try {
    const workout = await Workout.findByPk(req.params.id)
    if (Object.keys(req.body).includes('method')) {
      if (req.body['method'] === 'associate') {
        await workout.addExercise(req.body.exerciseId)
        const updatedWorkout = await Workout.findByPk(req.params.id, {
          include: 
            [{model: Exercise}]
        })
        res.send(updatedWorkout)
      } else if (req.body['method'] === 'dissociate') {
        await workout.removeExercise(req.body.exerciseId)
        const updatedWorkout = await Workout.findByPk(req.params.id, {
          include: 
            [{model: Exercise}]
        })
        res.send(updatedWorkout)
      }
    } else {
      await workout.update(req.body)
      const updatedWorkout = await Workout.findByPk(req.params.id, {
        include: 
          [{model: Exercise}]
      })
      res.send(updatedWorkout)
    }
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const {id} = req.user
    const workout = await Workout.findByPk(req.params.id, {
      where: {
        userId: id
      }
    })
    await workout.destroy()
    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
})