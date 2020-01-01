var admin = require("firebase-admin");
const functions=require("firebase-functions");

var db=admin.database();
var ref=db.ref("https://project-tnp-be0af.firebaseio.com/StudentDB/");
console.log('he;;o');
ref.on("child_added", function(data) {
  
  console.log("id " + data.id);
  console.log("firstname " + data.firstName);
  console.log("midname " + data.lastName);
});