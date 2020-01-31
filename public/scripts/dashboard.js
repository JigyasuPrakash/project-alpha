$(document).ready(function () {
    console.log("Document is ready")
    $('#userName').text(sessionStorage.getItem('name'));
    $('#userEmail').text(sessionStorage.getItem('email'));
});

function goTo(path) {
    var getReq = sessionStorage.getItem('accessId');
    var actualPath = '';
    if (path == '#') {
        actualPath = path;
    }else if(path == 'login'){
        actualPath = '/login';
    } else {
        actualPath = path + '?accessId=' + getReq;
    }
    window.location.href = actualPath;
}

function getStudent() {
    const search = document.getElementById("textToSearch").value;
    console.log(search);
    if (search != "" && search != null) {
        sessionStorage.setItem("toSearch", search + "@rknec.edu");
        goTo('/dashboard/student/result');
    }
}