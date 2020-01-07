function Login() {
    window.location.href = "./login.html"
}

function signUp() {
    console.log("Hi from signup methods")
    var email = document.getElementById("email").value;
    var pass = document.getElementById("password").value;

    auth.createUserWithEmailAndPassword(email, pass)
        .then(cred => {
            return db.collection('user-accounts').doc(cred.user.uid).set({
                firstName: document.getElementById("firstName").value,
                lastName: document.getElementById("lastName").value,
                isAdmin: false
            })
        })
        .then(() => {
            alert('Signup completed!! Go to Login Page to continue..');
            window.location.href = "./login.html";
        })
        .catch((e) => {
            alert(e.message);
        });
}