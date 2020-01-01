const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();


exports.retreiveData=functions.https.onRequest((request,response) => {
    var db=admin.database();
    var ref=db.ref().child('StudentDB').child('Student1');
    console.log('hello');
    
    ref.on('value', function(data) {
        console.log(data);
    });
    
});


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
