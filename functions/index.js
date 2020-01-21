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
const serviceAccount = require('./project-tnp-be0af-firebase-adminsdk-gbpvv-323362588a.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

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



//Provide Admin Role to an account
exports.addAdminRole = functions.https.onCall((data, context) => {
    //get user and add custom claims (admin)
    return admin.auth().getUserByEmail(data.email)
    .then(user =>{
        return admin.auth().setCustomUserClaims(user.uid, {
            admin: true
        })
    }).then(()=>{
        return {
            message: `Success! ${data.email} has been made admin!!`
        }
    }).catch(err =>{
        return err;
    })
})


/*
* const obj = JSON.parse(input text);
* const doc = {
    name: obj.name,
    branch: obj.branch
    };
    return db.collec
*/
