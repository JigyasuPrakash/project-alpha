$(document).ready(function () {
    console.log("Document is ready")
    $('#userName').text(localStorage.getItem('userNameRecieved'));
    $('#userMail').text(localStorage.getItem('userMailRecieved'));
});

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

function makeAdmin(){
    const email = document.getElementById('makeThisAdmin').value;
    console.log("Making "+email+" an admin");

    const addAdminRole = funcitons.httpsCallable('addAdminRole');
    addAdminRole({email : email}).then(result =>{
        console.log(result);
    });
}

function adminUI(isAdmin){
    const adminElement = document.getElementById('adminElement');
    if(isAdmin){
        adminElement.style.display = 'block';
    }
}