// $(document).ready(function () {
//     console.log("Document is ready")
//     $('#userName').text(localStorage.getItem('userNameRecieved'));
//     $('#userMail').text(localStorage.getItem('userMailRecieved'));

// });

function studentSection() {
    console.log("Taking user to Student section!!");
    //window.location.href = "./studentSection" + '?accessId=3btcfJeRxsa1HlFrpIXACWAJYrD2';
}

function alumniSection() {
    console.log("Taking user to Alumni section!!");
    //window.location.href = './alumniSection' + '?accessId=3btcfJeRxsa1HlFrpIXACWAJYrD2';
}

function companySection() {
    console.log("Taking user to Company section!!");
    //window.location.href = './companySection.html' + '?accessId=3btcfJeRxsa1HlFrpIXACWAJYrD2';
}

// function makeAdmin() {
//     const email = document.getElementById('makeThisAdmin').value;
//     console.log("Making " + email + " an admin");

//     const addAdminRole = funcitons.httpsCallable('addAdminRole');
//     addAdminRole({ email: email }).then(result => {
//         console.log(result);
//     });
// }

function getStudent() {
    const search = document.getElementById("textToSearch").value;
    console.log(search);
    if (search != "" && search != null) {
        localStorage.setItem("toSearch", search + "@rknec.edu");
        //window.location.href = "./searchResult.html";
    }
}
