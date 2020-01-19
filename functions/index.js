<<<<<<< HEAD
var firebase=require('firebase');

var firebaseConfig = {
    apiKey: "AIzaSyCx3lQ3Oe4oKrJCdTcp4CKlDeKiRRxbdWc",
    authDomain: "project-tnp-be0af.firebaseapp.com",
    databaseURL: "https://project-tnp-be0af.firebaseio.com",
    projectId: "project-tnp-be0af",
    storageBucket: "project-tnp-be0af.appspot.com",
    messagingSenderId: "518046381835",
    appId: "1:518046381835:web:f87059d9fdfc1fe0f4140e",
    measurementId: "G-R71GXZPYXL"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.database().ref().child('StudentDB').on('child_added',function(object) {
    console.log(object.val());
=======
const functions = require('firebase-functions');
const admin = require('firebase-admin');

/* 
//project-tnp-be0af-firebase-adminsdk-gbpvv-65c1a43930.json
    this file might be missing in your git pull because this file consists of private access key..
    which cannot be shared with any one.. to get your private key head over to firebase -> project setting
    scroll down and click on generate private key and paste that file inside this project on the path
    TNP-App -> functions..
*/

//Initialize required dependency for backend
const serviceAccount = require('./project-tnp-be0af-firebase-adminsdk-gbpvv-65c1a43930.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
>>>>>>> b0c358a0be5b8bdd67263ba23a917654aa60f03f
});
const db = admin.firestore();

<<<<<<< HEAD
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
=======
exports.getDataById = functions.https.onRequest((request, response) => {
    console.log("Stating here");
    db.collection('student-data').doc(request.query.email).get()
        .then(doc => {
            //Handle data recieved from database here and feed into the response method
            return response.status(200).json({
                status: true,
                firstName: doc.data().firstName,
                middleName: doc.data().middleName,
                lastName: doc.data().lastName,
                email: doc.data().email
            });
        })
        .catch(_ => {
            response.status(404).json({
                status: false
            });
            process.exit();
        })
});

/*
* const obj = JSON.parse(input text);
* const doc = {
    name: obj.name,
    branch: obj.branch
    };
    return db.collec
*/
>>>>>>> b0c358a0be5b8bdd67263ba23a917654aa60f03f
