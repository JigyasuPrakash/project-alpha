/*************************************** Common functions are here ***************************************/
$(document).ready(function () {
    var path = '/api/' + localStorage.getItem('userType') + window.location.pathname;
    var token = localStorage.getItem('SessionID');
    if (path === null || token === null) {
        alert("Please login first!!");
        window.location.href = './login';
    }
    $.ajax({
        type: "GET",
        url: path,
        body: {
            email: localStorage.getItem('toSearch')
        },
        beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', token); },
        success: function (result) {
            $('#content').empty();
            document.getElementById('content').insertAdjacentHTML('afterbegin', result);
        },
    });
    $('#userName').text(localStorage.getItem('name'));
    $('#userEmail').text(localStorage.getItem('email'));
})

function goTo(goToPath) {
    if (goToPath === '#') {
        return
    }
    window.location.href = goToPath;
}

function logOut(loginPath) {
    localStorage.clear();
    window.location.href = loginPath;
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
