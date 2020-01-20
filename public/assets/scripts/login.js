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

const form = document.querySelector('#login-form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = form.email.value;
  const pass = form.password.value;
  form.reset();
  
  auth.signInWithEmailAndPassword(email, pass)
    .then((cred) => {
      console.log("Logged in Successfully");
      return db.collection('user-accounts').doc(cred.user.uid).get().then((snapshot) => {
        localStorage.setItem('userNameRecieved', snapshot.data().firstName + " " + snapshot.data().lastName);
        localStorage.setItem('userMailRecieved', cred.user.email);
      })
    }).then(() => {
      window.location.href = "./admin/html/dashboard.html";
    }).catch(err => {
      alert("Incorrect Email or Password..!")
    })
});