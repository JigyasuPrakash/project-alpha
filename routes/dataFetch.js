const express = require('express');
const router = express.Router();
const cors = require('cors');
const config = require('../config/database');
const passport = require('passport');
var mongoClient=require('mongodb').MongoClient;

// this endpoint would be accessed by /api/admin/fetch/data/{pathname}
// and requires JSON WEB TOKENS for authentication..
/*
router.get('/{pathname}', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    //create logic here
    //use req.query.{key} to get data from request


    //send response
    res.setHeader('Content-Type', 'text/html');
    res.sendJSON();
});
*/
router.get('/searchStudent', (req, res) => {
    //handle request
    var filterData=req.query;
    var branch=filterData.Branch;
    var isBranch = false; isCat = false; isGen = false; isCG = false;
    console.log(branch);
    var searchResult=[];
    
    mongoClient.connect(config.cluster, function(error, database) {
        if(error) {
            console.log('error');
            throw error;
        }

        var dbObject_personal=database.db('student_details');

        dbObject_personal.collection('student_personal_details').find({Branch: {$in: branch}}).toArray(function(error, result) {
            if(error) {
                console.log('error');
                throw error;
            }
            console.log(result);
            searchResult.push(result);
        });
        

    });

    //send response
    res.setHeader('Content-Type', 'text/html');
    res.json(searchResult);
});

module.exports = router;