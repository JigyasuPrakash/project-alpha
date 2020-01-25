$(document).ready(function () {
    console.log("Document is ready")
    const isAdmin = localStorage.getItem('isAdmin');
    if (isAdmin) {
        $('#adminUserName').text(localStorage.getItem('userNameRecieved'));
        $('#adminUserMail').text(localStorage.getItem('userMailRecieved'));
    } else {
        $('#userName').text(localStorage.getItem('userNameRecieved'));
        $('#userMail').text(localStorage.getItem('userMailRecieved'));
    }
});

function studentSection() {
    console.log("Taking user to Student section!!");
    window.location.href = "./studentSection.html";
}

function alumniSection() {
    console.log("Taking user to Alumni section!!");
     window.location.href = "./alumniSection.html";
}

function companySection() {
    console.log("Taking user to Company section!!");
    window.location.href = "./companySection.html";
}

function makeAdmin() {
    const email = document.getElementById('makeThisAdmin').value;
    console.log("Making " + email + " an admin");

    const addAdminRole = funcitons.httpsCallable('addAdminRole');
    addAdminRole({ email: email }).then(result => {
        console.log(result);
    });
}

function getStudent() {
    const search = document.getElementById("textToSearch").value;    
    console.log(search);
    if(search!="" && search!=null) {
        localStorage.setItem("toSearch",search+"@rknec.edu");
        window.location.href="./searchResult.html";
    }
}

function loadUI(isAdmin) {
    const normalUI = document.getElementById('normalUI');
    const adminUI = document.getElementById('adminUI');
    if (isAdmin) {
        adminUI.style.display = 'block';
    } else {
        normalUI.style.display = 'block';
    }
}