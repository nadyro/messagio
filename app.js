var createError = require('http-errors');
var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io').listen(http);
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var api = require("./routes/api.route");
var bluebird = require("bluebird");
var mongoose = require("mongoose");

mongoose.Promise = bluebird;
mongoose.connect("mongodb://localhost/messagio", { useNewUrlParser: true }).then(() => { console.log('Successfully connected to Database Messagio.') }).catch(() => { console.log('Unable to connect to database Messagio.') });

app.use(function (request, response, next) {
  response.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
  response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  response.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

io.on('connection', (socket) => {
  console.log("User connected");
  socket.on('disconnect', function(){
    console.log("user disconnected");
  });
  socket.on('add-messagio', (message) => {
    console.log("Message received : " + message);
    io.emit('messagio', {type: 'new-message', object: message});
  });
});
http.listen(3000, function(request, response){
console.log("server is running");
});

module.exports = app;
