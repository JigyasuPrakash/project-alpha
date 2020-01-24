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
      console.log("Admin Details are: " + cred.admin);
      return db.collection('user-accounts').doc(cred.user.uid).get().then((snapshot) => {
        const userName = snapshot.data().firstName + " " + snapshot.data().lastName;
        const userMail = cred.user.email
        localStorage.setItem('userNameRecieved', userName);
        localStorage.setItem('userMailRecieved', userMail);
      })
    }).then(() => {
      window.location.href = "./dashboard.html";
    }).catch(err => {
      alert("Incorrect Email or Password..!")
    })
});