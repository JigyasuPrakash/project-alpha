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
const auth = firebase.auth();
const db = firebase.firestore();

function Login() {
    window.location.href = "./login.html"
}

const form = document.querySelector('#signup-form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const firstName = form.firstName.value;
    const lastName = form.lastName.value;
    const email = form.email.value;
    const pass = form.password.value;
    form.reset();

    auth.createUserWithEmailAndPassword(email, pass)
        .then(cred => {
            //User Account details are stored to firestore using this JSON object
            return db.collection('user-accounts').doc(cred.user.uid).set({
                firstName: firstName,
                lastName: lastName,
            })
        })
        .then(() => {
            alert('Signup completed!! Go to Login Page to continue..');
            auth.signOut()
                .then(() => {
                    window.location.href = "../login";
                });
        })
        .catch((e) => {
            alert(e.message);
        });
});