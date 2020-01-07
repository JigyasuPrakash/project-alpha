auth.onAuthStateChanged((user) => {
    if (user) {
        console.log(user.uid);
    } else {
        window.location.href = "./login.html";
    }
});

function logOut() {
    console.log("Signout process started")
    auth.signOut();
    localStorage.clear;
}

$(document).ready(function(){
    console.log("Document is ready")
    $('#userName').text(localStorage.getItem('userNameRecieved'));
    $('#userMail').text(localStorage.getItem('userMailRecieved'));
});



const form = document.querySelector('#Studentfilldata');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    //data_array=$("#form").serializeArray();
    /*console.log("adding details")
    console.log(form.firstName.value)
    console.log(form.branchName.value)
    console.log(form.semester.value)
    console.log($("input[name='shift']:checked").val())*/
    var key=form.email.value.trim().substring(0,form.email.value.length-10)
    db.collection('Student-data').doc(key).set({
        firstName: form.firstName.value,
        middleName: form.middleName.value,
        lastName: form.lastName.value,
        email: form.email.value,
        rollNum: form.rollNum.value,
        branchName: form.branchName.value,
        shift: $("input[name='shift']:checked").val(),
        password: form.password.value
            });
    alert('STUDENT FORM SUBMITTED');

    
    
});