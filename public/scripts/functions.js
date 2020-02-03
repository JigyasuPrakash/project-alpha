/*************************************** Common functions are here ***************************************/
function goTo(goToPath) {
    if (goToPath === '#') {
        return
    }
    window.location.href=goToPath;

}

function logOut() {
    localStorage.clear();
    window.location.href = './login';
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
