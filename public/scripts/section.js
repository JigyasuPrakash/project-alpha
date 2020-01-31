$(document).ready(function () {
    console.log("Document is ready")
    $('#userName').text(sessionStorage.getItem('name'));
    $('#userEmail').text(sessionStorage.getItem('email'));
});

function addNewStudent() {
    console.log('AddStudent.html is called')
    //window.location.href = "./addStudent.html";
}

function goTo(path) {
    var getReq = sessionStorage.getItem('accessId');
    switch (path) {
        case 'dashboard':
            window.location.href = '/dashboard' + '?accessId=' + getReq;
            break;
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
    }
}