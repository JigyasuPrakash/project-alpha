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


function Login(){
    window.location.href = "./login.html"
}

function signUp(){
    console.log("Hi from signup methods")
    var email = document.getElementById("email");
    var pass = document.getElementById("password");

    auth.createUserWithEmailAndPassword(email.value, pass.value)
    .then((u)=>{
        alert('Signup completed!! Go to Login Page to continue..');
        window.location.href = "./login.html";
    }).catch((e) => {
        alert(e.message);
    });
    
}