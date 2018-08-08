var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose'); //============== Connect to mongodb ============

var indexRouter = require('./routes/index');
let signUpRouter = require('./routes/api/signup.js');
let signInRouter = require('./routes/api/signin.js');
let verifyRouter = require('./routes/api/verify.js');
let logoutRouter = require('./routes/api/logout.js');
let vouchRouter = require('./routes/api/vouch.js');
let profileRouter = require('./routes/api/profile.js');
let uploadRouter = require('./routes/api/uploadFile.js');
let getImageRouter = require('./routes/api/getImage.js');
let routesRouter = require('./routes/api/Route.js');
let tripsRouter = require('./routes/api/trip.js');
let carpoolRouter = require('./routes/api/carpool');
let offerRouter = require('./routes/api/offers.js');

var app = express();

mongoose.connect('mongodb://localhost/carpool'); //========== Define db ================
mongoose.connection.on('open', function() {
	console.log('Mongoose connected');
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/account/signup', signUpRouter)
app.use('/api/account/signin', signInRouter)
app.use('/api/account/verify', verifyRouter)
app.use('/api/account/logout', logoutRouter)
app.use('/api/account/vouch', vouchRouter)
app.use('/api/account/profile', profileRouter)
app.use('/api/account/uploadFile', uploadRouter)
app.use('/api/account/getImage', getImageRouter)
app.use('/api/system/route', routesRouter)
app.use('/api/system/trip', tripsRouter)
app.use('/api/system/carpool', carpoolRouter)
app.use('/api/system/offers', offerRouter)

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