$(document).ready(function () {
    console.log("Document is ready")
    $('#userName').text(localStorage.getItem('name'));
    $('#userEmail').text(localStorage.getItem('email'));
});

function goTo(path) {
    var getReq = localStorage.getItem('accessId');
    var actualPath = '';
    if (path == '#') {
        actualPath = path;
    } else {
        actualPath = path + '?accessId=' + getReq;
    }
    window.location.href = actualPath;
}

function getStudent() {
    const search = document.getElementById("textToSearch").value;
    console.log(search);
    if (search != "" && search != null) {
        localStorage.setItem("toSearch", search + "@rknec.edu");
        goTo('/dashboard/student/result');
    }
}