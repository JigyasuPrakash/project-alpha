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
firebase.analytics();
const auth = firebase.auth();
const db = firebase.firestore();
const funcitons = firebase.functions();

auth.onAuthStateChanged((user) => {
  if (user) {
    user.getIdTokenResult().then(idTokenResult =>{
      user.admin = idTokenResult.claims.admin;
      adminUI(user.admin);
      console.log("Admin Property: "+user.admin);
    })
    console.log("Congratulations you are logged in");
  } else {
    window.location.href = "../../login.html";
  }
});

// app.get('/', function(req, res) {
//   res.render('../assets/html/searchResult.html');
// })


function getStudent(){
  let student=db.collection('student-data');

  const search=document.getElementById("textToSearch").value;
  const found;

  let query=student.where('email','==',search).get()
  .then(snapshot => {
    if(snapshot.empty) {
      console.log('no match'+student.doc());
      found=false;
      generateUI(found,stu);
      return;
    }
    
    found=true;
    snapshot.forEach(stu => {
      console.log(stu.id, stu.data());
      generateUI(found,stu);
    })
  })
  .catch(err => {
    console.log('error getting');
  })
  
}


function logOut() {
  console.log("Signout process started")
  auth.signOut();
  localStorage.clear();
}
