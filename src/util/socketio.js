const session = require('express-session');
const passport = require('passport');
const MySQLStore = require('express-mysql-session')(session);

require('dotenv').config();

const wrap = (middleware) => (socket, next) =>
  middleware(socket.request, {}, next);
const setupSocketIo = (server) => {
  const io = require('socket.io')(server, {
    cors: {
      origin: '*',
    },
  });

  io.use(
    wrap(
      session({
        store: new MySQLStore({
          connectionLimit: 10,
          createDatabaseTable: true,
          database: process.env.DB_V2_NAME,
          host: process.env.DB_SERVER,
          password: process.env.DB_PWD,
          port: process.env.DB_PORT,
          user: process.env.DB_USER,
        }),
        secret: process.env.COOKIE_SECRET,
        rolling: true,
        cookie: {
          maxAge: 99999999,
        },
        saveUninitialized: true,
        resave: false,
      })
    )
  );
  io.use(wrap(passport.initialize()));
  io.use(wrap(passport.session()));

  io.use((socket, next) => {
    if (socket.request.user) {
      next();
    } else {
      next(new Error('unauthenticated'));
    }
  });

  io.on('connection', (socket) => {
    socket.on('message', (text, room) => {
      const { username, id: userId } = socket.request.user;
      io.to(room).emit('message', { text, username, userId });
    });

    socket.on('join-room', (room) => {
      const { username } = socket.request.user;
      socket.join(room);
      io.to(room).emit('join-room', { username });
    });
  });
};

module.exports = { setupSocketIo };
