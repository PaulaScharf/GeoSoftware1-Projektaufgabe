// jshint esversion: 8
// jshint maxerr: 1000

"use strict";  // JavaScript code is executed in "strict mode"


/**
* @desc final project, Geosoftware1, SoSe2019
* @author name: Katharina Poppinga, matr.: 450 146; name: Paula Scharf, matr.: 450 334
*/


// load modules:
// load http-module and save it in const-OBJECT http
const http = require("http");
// load path-module and save it in const-OBJECT path
const path = require("path");


// load third-modules: (after installed using cmd: npm install ...)
// load express-module and save it in const-FUNCTION express
const express = require('express');
// call express and save it in the function app
const app = express();
// load mongodb-module and save it in const-FUNCTION mongodb
const mongodb = require('mongodb');





// folgendes aus express generator:
var createError = require('http-errors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var itemsRouter = require('./routes/items');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Log-Modus "dev"
app.use(logger('dev'));



// load/provide all files given in the folder public (public is in the directory in which the actual file is in)
app.use(express.static(path.join(__dirname, 'public')));

// use built-in middleware which parses incoming requests with JSON payloads so that explicit parse expressions for every JSON are not necessary
app.use(express.json());

// use built-in middleware which parses urlencoded bodies
// https://expressjs.com/en/4x/api.html#express.urlencoded
app.use(express.urlencoded({ extended: false }));




app.use(cookieParser());




/*
// "Erstelle die Routen für die installierten Client-Bibliotheken":
app.use('/jquery', express.static(path.join(__dirname, 'node_modules', 'jquery', 'dist')));
app.use('/qunit', express.static(path.join(__dirname, 'node_modules', 'qunit', 'qunit')));
*/



// DATENBANKVERBINDUNG ANDERS IN AUFGABE 8
// connect to MongoDB and use database "routeDB":

// asynchronous scope
(async () => {
  // try to connect to mongodb on localhost:27017, if not possible throw an exception/error:
  try {
    // await blocks and waits for connection, because here synchronous execution is desired
    app.locals.dbConnection = await mongodb.MongoClient.connect(
      // connectionString / connection URL:
      "mongodb://localhost:27017",
      {
        useNewUrlParser: true,
        autoReconnect: true
      });

      // connect to and use database "routeDB" (create this database, if it does not exist)
      app.locals.db = await app.locals.dbConnection.db("routeDB");
      // tell the user that the connection is established and databse "routeDB" will be used for following operations
      console.log("Using DB: " + app.locals.db.databaseName);

      // tell the user the URL for starting the application / where the routes are shown
      console.log("URL for starting and viewing the routes: http://localhost:" + port + "/index.html");

      // catch possible errors and tell the user about them:
    } catch (error) {
      console.dir(error);
      console.log(error.message);
    }
  }) ();


  // using standard port 3000
  var port = 3000;




// AUS AUFGABE 8
  // middleware for making the db connection available via the request object
  app.use((req, res, next) => {
    req.db = app.locals.db;
    next();
  });




  app.use('/', indexRouter);
  app.use('/users', usersRouter);

  // CRUD functionality
  app.use('/item', itemsRouter);



  // folgendes auch aus express generator:

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

  // ********************************
