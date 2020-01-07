auth.onAuthStateChanged((user) => {
    if (user) {
        console.log(user.uid);
    } else {
        window.location.href = "./login.html";
    }
});

$(document).ready(function(){
    console.log("Document is ready")
    $('#userName').text(localStorage.getItem('userNameRecieved'));
    $('#userMail').text(localStorage.getItem('userMailRecieved'));
});

function logOut() {
    console.log("Signout process started")
    auth.signOut();
    localStorage.clear;
}

function studentSection() {
    console.log("Taking user to Student section!!");
    window.location.href = "./studentSection.html";
}

function alumniSection() {
    console.log("Taking user to Alumni section!!");
}

function companySection() {
    console.log("Taking user to Company section!!");
}
