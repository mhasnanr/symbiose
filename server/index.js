const authRouter = require('./router/auth.route');
const { User } = require('./models');

const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const session = require('express-session');

const app = express();
const port = 3000;

// json handler
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// mongodb connection
mongoose.connect('mongodb://127.0.0.1:27017/symbiose');
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

// passport
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async function verify(email, password, done) {
      try {
        const user = await User.findOne({ email: email });

        if (!user) {
          throw new Error('user is not found');
        }

        if (password !== user.password) {
          throw new Error('invalid credential');
        }

        done(null, {
          id: user._id,
          email: user.email,
        });
      } catch (error) {
        done(error, null);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

// session initialization
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// main app router
app.get('/', (req, res) => {
  res.send('Hello world!');
});
app.use('/auth', authRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
