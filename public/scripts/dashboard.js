$(document).ready(function () {
    console.log("Document is ready")
    $('#userName').text(localStorage.getItem('name'));
    $('#userEmail').text(localStorage.getItem('email'));
});

function studentSection() {
    console.log("Taking user to Student section!!");
    var getReq = localStorage.getItem('accessId');
    window.location.href = "/dashboard/studentSection" + '?accessId=' + getReq;
}

function alumniSection() {
    console.log("Taking user to Alumni section!!");
    var getReq = localStorage.getItem('accessId');
    window.location.href = '/dashboard/alumniSection' + '?accessId=' + getReq;
}

function companySection() {
    console.log("Taking user to Company section!!");
    var getReq = localStorage.getItem('accessId');
    window.location.href = '/dashboard/companySection' + '?accessId=' + getReq;
}

function getStudent() {
    const search = document.getElementById("textToSearch").value;
    console.log(search);
    if (search != "" && search != null) {
        localStorage.setItem("toSearch", search + "@rknec.edu");
        //window.location.href = "./searchResult.html";
    }
}

function goTo(path) {
    var getReq = localStorage.getItem('accessId');
    if (path == 'dashboard') {
        window.location.href = '#'
    } else {
        switch (path) {
            case 'studentSection':
                window.location.href = '/dashboard/studentSection' + '?accessId=' + getReq;
                break;
            case 'searchStudent':
                window.location.href = '/dashboard/searchStudent' + '?accessId=' + getReq;
                break;
            case 'alumniSection':
                window.location.href = '/dashboard/alumniSection' + '?accessId=' + getReq;
                break;
            case 'companySection':
                window.location.href = '/dashboard/companySection' + '?accessId=' + getReq;
                break;
        }
    }
}