const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const flash = require('connect-flash');
const handlebars = require('handlebars');
const http = require('http');
const https = require('https');
const methodOverride = require('method-override');
const passport = require('passport');
const path = require('path');
const routes = require('./routes');
const session = require('express-session'),
  MySQLStore = require('express-mysql-session')(session);
const {
  allowInsecurePrototypeAccess,
} = require('@handlebars/allow-prototype-access');
const { engine } = require('express-handlebars');
const {
  generateDefaultRoom,
  getUserCartItemCount,
  helpers,
  initPassports,
  initTestData,
  setupSocketIo,
} = require('./util');

require('dotenv').config();

const app = express();

app.use(
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
);
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(flash());
app.use(express.static(path.join(__dirname, '../public')));

// set handlebar as view engine
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '../views'));

app.engine(
  'handlebars',
  engine({
    handlebars: allowInsecurePrototypeAccess(handlebars),
    helpers: helpers,
  })
);

const prerunPromises = [
  // passports
  initPassports(),
  // chat setup
  generateDefaultRoom(),
  // test data
  initTestData(),
];
(async () => await Promise.all(prerunPromises))();

// set global variables
app.use(async (req, res, next) => {
  res.locals.error = req.flash('error');
  res.locals.info = req.flash('info');
  res.locals.success = req.flash('success');
  res.locals.authenticated = req.isAuthenticated();
  res.locals.user = req.user;
  res.locals.path = req.path;
  res.locals.cartItemCount = req.isAuthenticated()
    ? await getUserCartItemCount(req.user.id)
    : 0;
  next();
});

// mount routes
app.use('/', routes);

// create servers
const httpServer = http.createServer(app);
const httpsServer = https.createServer(app);

// setup socketio
setupSocketIo(httpServer);
setupSocketIo(httpsServer);

module.exports = { httpServer, httpsServer };
