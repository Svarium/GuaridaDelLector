/* const express = require('express');
const app = express();
const port = 3030;
const path = require('path');


//Archivos estáticos
app.use(express.static(path.join(__dirname,  'public' )))

//Rutas
app.get('/',(req,res) => res.sendFile(path.join(__dirname, 'views', 'index.html')))
app.get('/carrito',(req,res) => res.sendFile(path.join(__dirname, 'views', 'carrito.html')))
app.get('/detalle',(req,res) => res.sendFile(path.join(__dirname, 'views', 'detalle.html')))
app.get('/login',(req,res) => res.sendFile(path.join(__dirname, 'views', 'login.html')))
app.get('/registro',(req,res) => res.sendFile(path.join(__dirname, 'views', 'registro.html')))
app.get('/categoria',(req,res) => res.sendFile(path.join(__dirname, 'views', 'categoria.html')))
app.get('*',(req,res) => res.sendFile(path.join(__dirname, 'views', '404.html')))

//Servidor levantado
app.listen(port, () => console.log('Servidor corriendo en el puerto ' + port)) */


const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const productsRouter = require('./routes/products');
const userRouter = require('./routes/user');
const cartRouter = require('./routes/cart');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/products', productsRouter);
app.use('/user', userRouter);
app.use('/', cartRouter);

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
