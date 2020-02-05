const express = require('express');
const router = express.Router();
const cors = require('cors');
const config = require('../config/database');
const passport = require('passport');
var mongoClient = require('mongodb').MongoClient;

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

    var filterData = req.query;
    var tosend = [];
    var branch = filterData.Branch;
    var gender = filterData.Gender;
    var cgpa = filterData.CGPA;
    if (cgpa == "" || cgpa == null) {
        cgpa = 0;
    }

    mongoClient.connect(config.cluster, function (error, database) {
        if (error) {
            console.log('error');
            throw error;
        }

        var dbObject_personal = database.db('student_details');
        if(branch!=null && branch.length!=0) {
            dbObject_personal.collection('student_personal_details').find({
                Branch: { $in: branch }
            }).toArray(function (error, result) {
                if (error) {
                    console.log('error');
                    throw error;
                }
                //console.log(result);


                result.forEach(element => {
                    if (element.CGPA >= cgpa) {
                        tosend.push(element);
                    }
                });
                if (gender != null) {
                    tosend = []
                    result.forEach(element => {
                        if (gender.includes(element.Gender) && element.CGPA >= cgpa) {
                            tosend.push(element);
                        }
                    });
                }
                // console.log(tosend);
                // console.log(tosend.length)
                if (tosend.size != 0) {
                    res.json(JSON.stringify(tosend));
                }
                tosend = [];
            });
        }
    });

    //send response
    res.setHeader('Content-Type', 'application/json');

});

router.get('/getStudentByEmail', (req, res) => {
    var toSearch=req.query.email;
    console.log(toSearch);

    mongoClient.connect(config.cluster, function (error, database) {
        if (error) {
            console.log('error');
            throw error;
        }

        var dbObject_personal=database.db('student_details');
        var found=false;

        dbObject_personal.collection('student_personal_details').find({
            _id: toSearch
        }).toArray(function(error, result) {
            if (error) {
                console.log('error occured');
                throw error;
            }
            res.json(JSON.stringify(result));
        });

    });

    //res.json(JSON.stringify(toSearch));
    res.setHeader('Content-Type', 'application/json');
});

module.exports = router;