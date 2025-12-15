const { User } = require('./models');
const authRouter = require('./router/auth.route');
const roomRouter = require('./router/room.route');

const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
const LocalStrategy = require('passport-local');
const MongoStore = require('connect-mongo');
const { createServer } = require('node:http');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const port = 3456;

// json handler
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// cors configuration
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

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
    store: MongoStore.create({
      mongoUrl: 'mongodb://localhost:27017/symbiose',
      collectionName: 'sessions',
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

// socket.io initialization
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173'],
  },
});

io.on('connection', (socket) => {
  console.log(`client ${socket.id} connected`);
  
  socket.on('join:room', (data) => {
    socket.join(data.roomId);
    socket.to(data.roomId).emit('user:joined', { userId: data.userId });
    console.log(`User joined room: ${data.roomId}`);
  });

  socket.on('leave:room', (data) => {
    socket.leave(data.roomId);
    socket.to(data.roomId).emit('user:left', { userId: data.userId });
    console.log(`User left room: ${data.roomId}`);
  });
});

// main app router
app.get('/', (req, res) => {
  res.send('Hello world!');
});
app.use('/auth', authRouter);
app.use('/room', roomRouter);

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
