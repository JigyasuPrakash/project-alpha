const functions = require('firebase-functions');
const admin = require('firebase-admin');
/* 
//project-tnp-be0af-firebase-adminsdk-gbpvv-65c1a43930.json
    this file might be missing in your git pull because this file consists of private access key..
    which cannot be shared with any one.. to get your private key head over to firebase -> project setting
    scroll down and click on generate private key and paste that file inside this project on the path
    TNP-App -> functions..

*/
const serviceAccount = require('./project-tnp-be0af-firebase-adminsdk-gbpvv-65c1a43930.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

exports.getDataById = functions.https.onRequest((request, response) => {
    //Id collection from request is pending......
    console.log("Stating here");
    db.collection('Student-data').doc('rashmi').get()
        .then(doc => {
            //Handle data recieved from database here and feed into the response method
            return response.status(200).json({
                name: doc.data().firstName,
                email: doc.data().email,
                message: 'Nice.. it is working!!'
            });
        })
        .catch(err => {
            console.err("Document not found!! "+err);
            response.status(404).json({
                message: 'Document not found'
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