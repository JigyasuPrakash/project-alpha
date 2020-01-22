$(document).ready(function () {
    console.log("Document is ready")
    $('#userName').text(localStorage.getItem('userNameRecieved'));
    $('#userMail').text(localStorage.getItem('userMailRecieved'));
});

const form = document.querySelector('#Studentfilldata');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    var key = form.email.value;
    db.collection('student-data').doc(key).set({
        firstName: form.firstName.value,
        middleName: form.middleName.value,
        lastName: form.lastName.value,
        email: form.email.value,
        rollNum: form.rollNum.value,
        branchName: form.branchName.value,
        shift: $("input[name='shift']:checked").val(),
        password: form.password.value
    });

    //Add a method to clear all the previous content
    alert('STUDENT FORM SUBMITTED');
});