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

var searchResult=new Set();

router.get('/searchStudent', (req, res) => {
    //handle request
    
    var filterData=req.query;
    var tosend={
        searchResult: null
    }
    var branch=filterData.Branch;
    var gender=filterData.Gender;
    var cgpa=filterData.CGPA;
    if(cgpa=="" || cgpa==null) {
        cgpa=0;
    }
   
    mongoClient.connect(config.cluster, function(error, database) {
        if(error) {
            console.log('error');
            throw error;
        }

        var dbObject_personal=database.db('student_details');

        dbObject_personal.collection('student_personal_details').find({
                Branch: {$in: branch}
            }).toArray(function(error, result) {
            if(error) {
                console.log('error');
                throw error;
            }
            //console.log(result);
            
            
            result.forEach(element => {
                if(element.CGPA>=cgpa) {
                    searchResult.add(element);
                }
            });
            if(gender!=null) {
                searchResult.clear();
                result.forEach(element => {
                    if(gender.includes(element.Gender) && element.CGPA>=cgpa) {
                        searchResult.add(element);
                    }
                });
            }
            console.log(searchResult);
            tosend['searchResult']=searchResult;
            if(searchResult.size!=0) {
                console.log(searchResult.size);
                res.json(tosend);
            }
            searchResult.clear();
        });
    });

    //send response
    res.setHeader('Content-Type', 'text/html');
    
});

module.exports = router;