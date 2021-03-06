const cors = require('cors');
var createError = require('http-errors');
var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io').listen(http);
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('client-sessions');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var api = require("./routes/api.route");
var bluebird = require("bluebird");
var mongoose = require("mongoose");
var counter = 0;

mongoose.Promise = bluebird;
mongoose.connect("mongodb://localhost/messagio", { useNewUrlParser: true })
.then(() => { console.log('Successfully connected to Database Messagio.') })
.catch(() => { console.log('Unable to connect to database Messagio.') });
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  cookieName: 'mySession',
  secret: 'random_sentence',
  duration: 120 * 60 * 1000,
  activeDuration: 30 * 60 * 1000
}));
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

var connections = [];
var i;
io.set('transports', ['websocket']);
io.on('connection', (socket) => {
  connections.push(socket);
  socket.on('disconnect', function () {
    i = connections.indexOf(socket);
    connections.splice(i, 1);
  });
  socket.on('add-messagio', (message) => {
    counter++;
    console.log("Message received : " + message);
    io.emit('messagio', { type: 'new-message', object: message, counter: counter });
  });
});
http.listen(3000, function (request, response) {
  console.log("server is running");
});

module.exports = app;
