# Active Flow — Workout Builder

A full-stack workout tracker with Passport authentication.

Users can sign up, log in, and build a personal exercise list. Each account can only view and manage its own exercises.

## Live Application

Render: [Visit Active Flow — Workout Builder](https://auth-workout-builder-active-flow.onrender.com/)

<img width="500" height="500" alt="Displine" src="https://github.com/user-attachments/assets/b987ce13-54c5-4f71-b984-7c45cacad906" />

<img width="500" height="500" alt="Discipline,jpg" src="https://github.com/user-attachments/assets/c514d32a-d521-46a8-b163-548cc4c6e11b" />

## Features

- Add exercises with a name, sets, and reps per set.
- View saved exercises.
- Mark exercises complete or incomplete.
- Delete exercises.
- Validate exercise information before saving.
- Sign up, log in, and log out.

## Built With

Node.js, Express, EJS, MongoDB Atlas, Mongoose, the MongoDB
Node.js driver, Passport, passport-local, bcrypt-nodejs,
express-session, connect-flash, dotenv, JavaScript, CSS,
Bootstrap, and Nodemon.

## Run Locally

1. Clone the repository and open its folder.
2. Run `npm install`.
3. Create a `.env` file containing your own values:

   MONGODB_URI=your_connection_string
   MONGODB_DB_NAME=WorkoutBuilder
   SESSION_SECRET=your_private_session_secret

4. Allow your IP address in MongoDB Atlas.
5. Run `npm run dev`.
6. Open http://localhost:8080.

Never commit your `.env` file.

## CRUD Routes

- GET /profile — Display the logged-in user's exercises.
- POST /exercises — Add an exercise.
- PUT /exercises — Change completed status.
- DELETE /exercises — Delete an exercise.

## What I Learned

- How to use Passport for authentication.
- How to connect saved exercises to their owner.
- How to validate form information.
- How to build CRUD routes and send requests with fetch.
- How to use responsive CSS.

## Credits

Adapted from the savage-auth starter provided through
Resilient Coders coursework and my authenticated R&B playlist project.
