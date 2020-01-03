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

  auth.onAuthStateChanged((user)=>{
    if(user){
        console.log(user.uid);
        //document.getElementById("dash-main").hidden(false);
        $(document).ready(function(){
            var userName = document.getElementById("userName");
            var userMail = document.getElementById("userMail");
            const db = firebase.firestore();
            db.collection('user-accounts').doc(user.uid).get().then((snapshot)=>{
                console.log(user);
                $('#userName').text(snapshot.data().firstName + " " + snapshot.data().lastName);
                $('#userMail').text(user.email);
            })
        });
    }else{
        window.location.href = "./login.html";
    }
});

function addNewStudent(){
    window.location.href = "./addStudent.html";
}
