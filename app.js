var http = require('http')
var express = require('express')
var mongoose = require("mongoose");
var index = require('./routes/index');
var users = require('./routes/users');
var dbstore = require('./routes/dbstore');
//var parsetodb = require('./routes/parsetodb');
var path = require('path')

var favicon = require('serve-favicon')
var logger = require('morgan')
var methodOverride = require('method-override')
var session = require('express-session')
var bodyParser = require('body-parser')
var multer = require('multer')
var errorHandler = require('errorhandler')

var app = express()

// all environments
app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')
mongoose.connect(
  `mongodb+srv://resume_parser:Sangu%401980@cluster0.puexm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error: "));
  db.once("open", function () {
    console.log("db Connected successfully");
  });
require('./models/uploads')
app.use(express.json())
app.use(logger('dev'))
app.use(methodOverride())
app.use(session({ resave: true,
  saveUninitialized: true,
  secret: 'uwotm8' }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname, 'public')))

app.use('/', index);
app.use('/users', users);
app.use('/dbstore', dbstore);
//app.use('/parsetodb', parsetodb);

// error handling middleware should be loaded after the loading the routes
if (app.get('env') === 'development') {
  app.use(errorHandler())
}

var server = http.createServer(app)
server.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'))
})


