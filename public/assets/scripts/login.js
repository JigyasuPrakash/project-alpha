auth.onAuthStateChanged((user) => {
  if (user) {
    console.log("Signed in");
  } else {
    console.log("Not Signed in");
  }
})

function signUp() {
  window.location.href = "./signup.html";
}

function login() {
  console.log("Hi from dashboard!!!!");
  var email = document.getElementById("email");
  var pass = document.getElementById("password");

  auth.signInWithEmailAndPassword(email.value, pass.value)
    .then((cred) => {
      console.log("Logged in Successfully");
      return db.collection('user-accounts').doc(cred.user.uid).get().then((snapshot) => {
        localStorage.setItem('userNameRecieved',snapshot.data().firstName + " " + snapshot.data().lastName);
        localStorage.setItem('userMailRecieved',cred.user.email);
      })
    }).then(() => {
      window.location.href = "./dashboard.html";
    })
}