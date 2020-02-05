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
    var toSend=[];

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
            toSend.push(result);
        });

        dbObject_personal.collection('student_current_academic_details').find({
            _id: toSearch
        }).toArray(function(error, result) {
            if(error) {
                console.log('error occured');
                throw error;
            }
            toSend.push(result);
        });

        dbObject_personal.collection('student_previous_academic_details').find({
            _id: toSearch
        }).toArray(function(error, result) {
            if(error) {
                console.log('error occured');
                throw error;
            }
            toSend.push(result);
        });

        dbObject_personal.collection('student_placement_details').find({
            _id: toSearch
        }).toArray(function(error, result) {
            if(error) {
                console.log('error occured');
                throw error;
            }
            toSend.push(result);
            console.log(toSend);
            res.json(JSON.stringify(toSend));
        });

        console.log(toSend);

        

    });

    //res.json(JSON.stringify(toSearch));
    res.setHeader('Content-Type', 'application/json');
});


router.get('/getStudentAnalytics', (req,res) => {
    var student=req.query.EmailId;
    console.log(student)
    var toSend=[];
    

    mongoClient.connect(config.cluster, function (error, database) {
        if (error) {
            console.log('error');
            throw error;
        }

        var dbObject = database.db('student_details');
        dbObject.collection('student_current_academic_details').find({
            _id: student
        }).toArray(function(error, result) {
            if (error) {
                console.log('error');
                throw error;
            }
            result.forEach(element => {
                toSend.push(element.Sem1SGPA);
                toSend.push(element.Sem2SGPA);
                toSend.push(element.Sem3SGPA);
                toSend.push(element.Sem4SGPA);
                toSend.push(element.Sem5SGPA);
                toSend.push(element.Sem6SGPA);
                toSend.push(element.Sem7SGPA);
                toSend.push(element.Sem8SGPA);
            });
            //console.log(toSend);
            res.json(JSON.stringify(toSend));
        });
    });

});

router.get('/getBranchAnalytics', (req,res) => {
    var branch=req.query.Branch;
    console.log(branch)
    var CGPA=[],PKG=[];
    var cg1=0,cg2=0,cg3=0,cg4=0,cg5=0,cg6=0,cg7=0,cg8=0;
    var c1=c2=c3=c4=c5=c6=c7=c8=0;
    var pkg1=pkg2=pkg3=pkg4=pkg5=pkg6=pkg7=pkg8=0;
    var toSend=[];

    mongoClient.connect(config.cluster, function (error, database) {
        if (error) {
            console.log('error');
            throw error;
        }

        var dbObject_personal = database.db('student_details');
        dbObject_personal.collection('student_personal_details').find({
            Branch: {$in: branch}
        }).toArray(function(error, result) {
            result.forEach(element => {
                if(element.Branch==='Computer Science and  Engineering') {
                    cg1+=element.CGPA;
                    c1++;
                    //pkg1+=element.package_offered;
                }
                if(element.Branch==='Electronics and Communication Engineering') {
                    cg2+=element.CGPA;
                    c2++;
                    //pkg2+=element.package_offered;
                }
                if(element.Branch==='Electronics Engineering') {
                    cg3+=element.CGPA;
                    c3++;
                    //pkg3+=element.package_offered;
                }
                if(element.Branch==='Electrical Engineering') {
                    cg4+=element.CGPA;
                    c4++;
                    //pkg4+=element.package_offered;
                }
                if(element.Branch==='Civil Engineering') {
                    cg5+=element.CGPA;
                    c5++;
                    //pkg5+=element.package_offered;
                }
                if(element.Branch==='Information Technology') {
                    cg6+=element.CGPA;
                    c6++;
                    //pkg6+=element.package_offered;
                }
                if(element.Branch==='Electronics Design Technology') {
                    cg7+=element.CGPA;
                    c7++;
                    //pkg7+=element.package_offered;
                }
                if(element.Branch==='Industrial Engineering') {
                    cg8+=element.CGPA;
                    c8++;
                    //pkg8+=element.package_offered;
                }
            });
            CGPA[0]=(parseFloat((cg1/c1).toFixed(2)));
            CGPA[1]=(parseFloat((cg2/c2).toFixed(2)));
            CGPA[2]=(parseFloat((cg3/c3).toFixed(2)));
            CGPA[3]=(parseFloat((cg4/c4).toFixed(2)));
            CGPA[4]=(parseFloat((cg5/c5).toFixed(2)));
            CGPA[5]=(parseFloat((cg6/c6).toFixed(2)));
            CGPA[6]=(parseFloat((cg7/c7).toFixed(2)));
            CGPA[7]=(parseFloat((cg8/c8).toFixed(2)));

            //PKG[0]=(parseFloat((pkg1/c1).toFixed(2)));
            //PKG[1]=(parseFloat((pkg2/c2).toFixed(2)));
            //PKG[2]=(parseFloat((pkg3/c3).toFixed(2)));
            //PKG[3]=(parseFloat((pkg4/c4).toFixed(2)));
            //PKG[4]=(parseFloat((pkg5/c5).toFixed(2)));
            //PKG[5]=(parseFloat((pkg6/c6).toFixed(2)));
            //PKG[6]=(parseFloat((pkg7/c7).toFixed(2)));
            //PKG[7]=(parseFloat((pkg8/c8).toFixed(2)));

            toSend.push(CGPA);
            toSend.push(PKG);

            //console.log(CGPA);
            res.json(JSON.stringify(toSend));
        });
        
    });
});

module.exports = router;