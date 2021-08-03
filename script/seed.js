'use strict'

const {db, models: {User, Exercise, Workout} } = require('../server/db')


/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')

  const cody = await User.create({ username: 'cody', password: '123' })
  const murphy = await User.create({ username: 'murphy', password: '123' })

  const bench_press = await Exercise.create({
    name: 'bench press',
    weight: '20 lbs',
    sets: '4',
    reps: '3',
    notes: 'focus on elbows'
  })

  const front_squat = await Exercise.create({
    name: 'front squat',
    weight: '60 lbs',
    sets: '4',
    reps: '8'
  })

  const squat = await Exercise.create({
    name: 'squat',
    weight: '60 lbs',
    sets: '4',
    reps: '8'
  })

  const leg_day = await Workout.create({
    name: 'leg day'
  })

  const chest_day = await Workout.create({
    name: 'chest day'
  })



  await cody.addExercise(squat)
  await cody.addExercise(front_squat)


  await leg_day.setExercises([squat, front_squat])


  await cody.addWorkout(leg_day)

  console.log(`seeded users`)
  console.log(`seeded successfully`)
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
