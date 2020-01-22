$(document).ready(function(){
    console.log("Document is ready")
    $('#userName').text(localStorage.getItem('userNameRecieved'));
    $('#userMail').text(localStorage.getItem('userMailRecieved'));
});

function addNewStudent() {
    window.location.href = "./addStudent.html";
}
