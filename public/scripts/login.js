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
firebase.initializeApp(firebaseConfig);
firebase.analytics();
const auth = firebase.auth();
const db = firebase.firestore();

function signUp() {
  window.location.href = "./signup.html";
}

const form = document.querySelector('#login-form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  $("#display_loading").css('visibility', 'visible');
  const email = form.email.value;
  const pass = form.password.value;
  form.reset();

  auth.signInWithEmailAndPassword(email, pass)
    .then((cred) => {
      console.log(cred.user)
      console.log("Logged in Successfully");
      return db.collection('user-accounts').doc(cred.user.uid).get().then(function (doc) {
        const name = doc.data().firstName + ' ' + doc.data().lastName;
        //A Hash Function is required here....
        localStorage.setItem('accessId', cred.user.uid);
        localStorage.setItem('name', name);
        localStorage.setItem('email', cred.user.email);
        var accessId = localStorage.getItem('accessId');

        window.location.href = '/dashboard' + '?accessId=' + accessId;
      })
    }).catch(err => {
      $("#display_loading").css('visibility', 'hidden');
      alert("Incorrect Email or Password..!")
    })
});


// $.ajax({
//   method: 'POST',
//   data: {
//     uid: cred.user.uid
//   },
//   url: "/dashboard", success: function (result) {
//     window.location.href = '/dashboard';
//   }
// });