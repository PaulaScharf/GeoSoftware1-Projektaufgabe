// jshint esversion: 8
// jshint maxerr: 1000

"use strict";  // JavaScript code is executed in "strict mode"


/**
* @desc final project, Geosoftware1, SoSe2019
* @author name: Katharina Poppinga, matr.: 450 146; name: Paula Scharf, matr.: 450 334
*/




var express = require('express');
const mongodb = require('mongodb');

var router = express.Router();


// ****************************************************************** CRUD-functionality: ******************************************************************

// *********** CREATE/insert (with html-form) ***********
// add a route from the req.body and redirect to the create.html
var postitemcontroller = function(req, res) {
    console.log("insert encounter");
    console.log(req.body);
    // your only able to add an item if it contains atleast the route-coordinates and a name

    // insert one item (one route) into current database
    req.db.collection('routeDB').insertOne(req.body, (error, result) => {
        if (error) {
            console.dir(error);
        }
        // after the item (route) is successfully created go back to the create-page
        res.send()
    });
};


//
var putitemcontroller = function (req, res) {

    console.log("update item");

    // convert the coordinate-string to Json
    //req.body.geoJson = JSON.parse(req.body.geoJson);
    //
    let objectId = new mongodb.ObjectID(req.body._id);
    // delete the id from the body
    delete req.body._id;

    console.log("update item" + objectId + " to the following:")
    console.log(req.body);

    // update the item in the db with the  id of the req.body (which is given in the form)
    req.db.collection('routeDB').updateOne({_id:objectId}, {$set: req.body}, (error, result) => {

        if(error){
            console.dir(error);
        }

        //
        res.send();
    });
};


//
var getAllitemcontroller = function(req,res) {
    req.db.collection('routeDB').find({type: "encounter"}).toArray((error, result) => {
        if(error){
            // give a notice, that the reading has failed and show the error-message on the console
            console.log("Failure in reading from 'routeDB'.", error.message);
            console.dir(error);
        }
        else {
            // ... give a notice, that the reading has succeeded and show the result on the console
            console.log("Successfully read the encounters from 'routeDB'.", result);
            console.log("display all in map");
            res.json(result);
        }
    });
};


// delete an item from the database and redirect to the overview.ejs
var deleteitemcontroller = function(req, res) {

    console.log("delete item " + req.query._id);
    //
    let objectId = new mongodb.ObjectID(req.query._id);

    // delete the item with the given id
    req.db.collection('routeDB').deleteOne({_id:objectId}, (error, result) => {

        if(error){
            console.dir(error);
        }
    });
    //
    // TODO: FEHLER BEHEBEN, TRITT AUF BEI/NACH(?) DEM LÖSCHEN VON BEGEGNUNGEN, NACHDEM ROUTEN GELÖSCHT WURDEN
    // AJAX request (deleting an encounter) has failed. JSON.parse: unexpected end of data at line 1 column 1 of the JSON data
    res.send();
};

// get a single encounter and the corresponding routes and render the singleroute.ejs view with that route
var singleencounterpagecontroller = function(req, res) {

    console.log("get items " + req.query.e_id + ", " + req.query.r1_id + ", " + req.query.r2_id);
    //
    req.db.collection('routeDB').find({_id: {"$in" : [new mongodb.ObjectID(req.query.e_id),
                new mongodb.ObjectID(req.query.r1_id),
                new mongodb.ObjectID(req.query.r2_id)]}}).toArray((error, result) => {

        if(error){
            // give a notice, that the reading has failed and show the error-message on the console
            console.log("Failure while reading from 'routeDB'.", error.message);
            // in case of an error while reading, do routing to "error.ejs"
            res.render('error');
            // if no error occurs ...
        } else {
            console.log(result);
            //
            res.render("singleEncounte", {result});
        }
    });
};

// **********************************

//
router.route("/post")
    .post(postitemcontroller);
//
router.route("/update")
    .post(putitemcontroller);
//
router.route("/getAll")
    .get(getAllitemcontroller);
//
router.route("/delete")
    .get(deleteitemcontroller);
//
router.route("/getSingleEncounter")
    .get(singleencounterpagecontroller);


module.exports = router;
