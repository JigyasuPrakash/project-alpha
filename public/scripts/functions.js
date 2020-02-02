/*************************************** Common functions are here ***************************************/
function goTo(goToPath) {
    var path = '/api/' + localStorage.getItem('userType') + '/' + goToPath;
    var token = localStorage.getItem('SessionID');
    if (path === null || token === null) {
        alert("Please login first!!");
        window.location.href = './login';
    }
    $.ajax({
        type: "GET",
        url: path,
        beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', token); },
        success: function (result) {
            document.getElementById('content').innerHTML = result;
            /** URL Updating mechanism is here.. needs to be updated */
            //window.history.pushState(result, '', goToPath);
        }
    });
}

function logOut() {
    localStorage.clear();
    window.location.href = './';
}

function getStudent() {
    const search = document.getElementById("textToSearch").value;
    console.log(search);
    if (search != "" && search != null) {
        localStorage.setItem("toSearch", search + "@rknec.edu");
        goTo('/dashboard/student/result');
    }
}





/*************************************** Dashboard specific functions are here ***************************************/










/*************************************** Stundent Section specific functions are here ***************************************/
$(document).ready(function () {
    console.log("Document is ready")
    $('#userName').text(localStorage.getItem('name'));
    $('#userEmail').text(localStorage.getItem('email'));
});

function addNewStudent() {
    console.log('AddStudent.html is called')
    //window.location.href = "./addStudent.html";
}