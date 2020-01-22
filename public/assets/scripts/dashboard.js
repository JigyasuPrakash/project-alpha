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

function generateUI(found, stu) {
    if(found) {
        $('#searchResult').append(`<div class="main-card mb-3 card">
        <div class="card-body"><h5 class="card-title">Dismissable Alerts</h5>
            <div class="alert alert-info alert-dismissible fade show" role="alert">
                <button type="button" class="close" aria-label="Close"><span aria-hidden="true">×</span></button>
                Student found : <br>Name - ${stu.data().firstName} ${stu.data().lastName}
                <br>Roll Number - ${stu.data().rollNum}
                <br> Branch - ${stu.data().branchName}
            </div>
        </div>
    </div>`)
    }
    else {
        $('#searchResult').append(`<div class="main-card mb-3 card">
        <div class="card-body"><h5 class="card-title">Dismissable Alerts</h5>
            <div class="alert alert-info alert-dismissible fade show" role="alert">
                <button type="button" class="close" aria-label="Close"><span aria-hidden="true">×</span></button>
                No match found
            </div>
        </div>
    </div>`)
    }
}

function adminUI(isAdmin){
    const adminElement = document.getElementById('adminElement');
    if(isAdmin){
        adminElement.style.display = 'block';
    }
}