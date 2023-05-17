require('dotenv').config()
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const methodOverride = require('method-override');
const session = require('express-session');
const passport = require('passport')
const cors = require('cors');
const { loginGoogleInitalize } = require('./src/services/googleService');


const indexRouter = require('./src/routes/index');
const productsRouter = require('./src/routes/products');
const authRouter = require('./src/routes/auth')
const userRouter = require('./src/routes/user');
const cartRouter = require('./src/routes/cart');

/* apis */

const apiUserRouter = require('./src/routes/api/usuario');
const productsApiRouter = require('./src/routes/api/productsApi');
const mainApi = require('./src/routes/api/mainApi')

const localsUserCheck = require('./src/middlewares/localsUserCheck');
const cookieCheck = require('./src/middlewares/cookieCheck');


const app = express();
loginGoogleInitalize()

// view engine setup
app.set('views', path.join(__dirname,'src','views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.use(session({
  secret : "Guarida del Lector 2023",
  resave : false,
  saveUninitialized: true
}))
app.use(cors())



app.use(cookieCheck)
app.use(localsUserCheck)

.use(passport.initialize())
.use(passport.session())

app.use('/', indexRouter);
app.use('/products', productsRouter);
app.use('/user', userRouter);
app.use('/', cartRouter);
app.use('/auth', authRouter)

/* apis */
app.use('/api/users', apiUserRouter);
app.use('/api/libros',productsApiRouter)
app.use('/api', mainApi)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
