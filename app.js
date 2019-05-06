const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const favicon = require('express-favicon');
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
let logger = require('morgan');
const auth = require('./auth');
let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');

let express = require('express');
let todoController = require('./controllers/todocontroller');
let app = express();
const xssFilter = require('x-xss-protection');
let mongoDBUrl = process.env.MONGODB_URI || 'mongodb://'+ process.env.MONGODB_USER+':'+ process.env.MONGODB_PASSWORD +'@172.30.115.53:27017/'+process.env.MONGODB_DATABASE;
//let mongoDBUrl ="mongodb://localhost/todo";
mongoose.connect(mongoDBUrl);
mongoose.Promise = global.Promise;

let db = mongoose.connection;

// use sessions for tracking logins
app.use(session({
    secret: 'work hard',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: db
    })
}));

// register session in templates
app.use(function(req,res,next){
    res.locals.session = req.session;
    next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//set up templates
app.set('view engine', 'pug');
// static files
app.use('/', express.static('./public'));
app.all('/todo*',auth.requiresLogin);
//fire controllers
todoController(app);

//listen to port
app.use('/', indexRouter);
//app.use('/users', usersRouter);
app.use(xssFilter());
//app.listen(process.env.PORT);


app.listen(3000);
//console.log('You are listening to port 3000');


module.exports = app;
