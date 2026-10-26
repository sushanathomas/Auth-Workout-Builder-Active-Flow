const { ObjectId } = require("mongodb");
module.exports = function (app, passport, db) {

  // normal routes ===============================================================

  // show the home page (will also have our login links)
  app.get('/', function (req, res) {
    res.render('index.ejs');
  });

  // PROFILE SECTION =========================

 // Get the logged-in user's exercises.
app.get('/profile', isLoggedIn, function(req, res) {
  db.collection('exercises').find({
    userId: req.user._id
  }).toArray((err, result) => {
    if (err) {
      console.error(err)
      return res.status(500).send('Unable to load your exercises.')
    }
    res.render('profile.ejs', {
      user: req.user,
      exercises: result
    })
  })
})

  // LOGOUT ==============================
  app.get('/logout', function (req, res) {
    req.logout(() => {
      console.log('User has logged out!')
    });
    res.redirect('/');
  });

  // message board routes ===============================================================

  // Save the workout for the user who is logged in.
  // Check the exercise information and save it for the logged-in user.
app.post('/exercises', isLoggedIn, (req, res) => {
  const name = (req.body.name || '').trim()
  const sets = Number(req.body.sets)
  const reps = Number(req.body.reps)

  if (!name) {
    return res.status(400).send('Please enter an exercise name.')
  }
  if (!Number.isInteger(sets) || sets < 1) {
    return res.status(400).send('Please enter a whole number of sets above zero.')
  }
  if (!Number.isInteger(reps) || reps < 1) {
    return res.status(400).send('Please enter a whole number of reps above zero.')
  }

  db.collection('exercises').insertOne({
    userId: req.user._id,
    name: name,
    sets: sets,
    reps: reps,
    completed: false
  }, (err, result) => {
    if (err) {
      console.error(err)
      return res.status(500).send('Unable to save your exercise.')
    }

    console.log('Exercise saved to database')
    res.redirect('/profile')
  })
})

  // Update an exercise belonging to the logged-in user.
app.put('/exercises', isLoggedIn, (req, res) => {
  const id = req.body.id
  const completed = req.body.completed

  if (!ObjectId.isValid(id)) {
    return res.status(400).send('Invalid exercise ID.')
  }

  if (typeof completed !== 'boolean') {
    return res.status(400).send('Completed must be true or false.')
  }

  db.collection('exercises').updateOne(
    {
      _id: new ObjectId(id),
      userId: req.user._id
    },
    {
      $set: { completed: completed }
    },
    (err, result) => {
      if (err) {
        console.error(err)
        return res.status(500).send('Could not update exercise.')
      }

      if (result.matchedCount === 0) {
        return res.status(404).send('Exercise not found.')
      }

      res.send('Exercise updated!')
    }
  )
})

// Delete an exercise belonging to the logged-in user.
app.delete('/exercises', isLoggedIn, (req, res) => {
  const id = req.body.id

  if (!ObjectId.isValid(id)) {
    return res.status(400).send('Invalid exercise ID.')
  }

  db.collection('exercises').deleteOne(
    {
      _id: new ObjectId(id),
      userId: req.user._id
    },
    (err, result) => {
      if (err) {
        console.error(err)
        return res.status(500).send('Could not delete exercise.')
      }

      if (result.deletedCount === 0) {
        return res.status(404).send('Exercise not found.')
      }

      res.send('Exercise deleted!')
    }
  )
})

  // =============================================================================
  // AUTHENTICATE (FIRST LOGIN) ==================================================
  // =============================================================================

  // locally --------------------------------
  // LOGIN ===============================
  // show the login form
  app.get('/login', function (req, res) {
    res.render('login.ejs', { message: req.flash('loginMessage') });
  });

  // process the login form
  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile', // redirect to the secure profile section
    failureRedirect: '/login', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));

  // SIGNUP =================================
  // show the signup form
  app.get('/signup', function (req, res) {
    res.render('signup.ejs', { message: req.flash('signupMessage') });
  });

  // process the signup form
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile', // redirect to the secure profile section
    failureRedirect: '/signup', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));

  // =============================================================================
  // UNLINK ACCOUNTS =============================================================
  // =============================================================================
  // used to unlink accounts. for social accounts, just remove the token
  // for local account, remove email and password
  // user account will stay active in case they want to reconnect in the future

  // local -----------------------------------
  app.get('/unlink/local', isLoggedIn, function (req, res) {
    let user = req.user;
    user.local.email = undefined;
    user.local.password = undefined;
    user.save(function (err) {
      res.redirect('/profile');
    });
  });

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();

  res.redirect('/');
}
