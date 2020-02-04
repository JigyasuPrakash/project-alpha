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


/******************************Search Student Function***********************************/

var branch = [], gen = [], cat = [];
var isBranch, isCat, isGen, isCG;

function createObject() {
    $('#filterResults').empty();
    $('#BranchFilter').empty();
    $('#CategoryFilter').empty();
    $('#GenderFilter').empty();
    $('#CGPAFilter').empty();
    isBranch = false; isCat = false; isGen = false; isCG = false;
    $("#display_loading").css('visibility', 'visible');
    if ($('#searchStudentCS').is(':checked')) {
        isBranch = true;
        $('#BranchFilter').append(` Computer Science Engineering`);
        branch[0] = "Computer Science and  Engineering";
    } else {
        branch[0] = null;
    }
    if ($('#searchStudentIT').is(':checked')) {
        isBranch = true;
        $('#BranchFilter').append(` Information Technology`);
        branch[1] = "Information Technology";
    } else {
        branch[1] = null;
    }
    if ($('#searchStudentIND').is(':checked')) {
        isBranch = true;
        $('#BranchFilter').append(` Industrial Engineering`);
        branch[2] = "Industrial Engineering";
    } else {
        branch[2] = null;
    }
    if ($('#searchStudentELEC').is(':checked')) {
        isBranch = true;
        $('#BranchFilter').append(` Electrical Engineering`);
        branch[3] = "Electrical Engineering";
    } else {
        branch[3] = null;
    }
    if ($('#searchStudentEDT').is(':checked')) {
        isBranch = true;
        $('#BranchFilter').append(` Electronics and Design Technology`);
        branch[4] = "Electronics Design Technology";
    } else {
        branch[4] = null;
    }
    if ($('#searchStudentEN').is(':checked')) {
        isBranch = true;
        $('#BranchFilter').append(` Electronics Engineering`);
        branch[5] = "Electronics Engineering";
    } else {
        branch[5] = null;
    }
    if ($('#searchStudentENT').is(':checked')) {
        isBranch = true;
        $('#BranchFilter').append(` Electronics and Communication Engineering`);
        branch[6] = "Electronics and Communication Engineering";
    } else {
        branch[6] = null;
    }
    if ($('#searchStudentCIV').is(':checked')) {
        isBranch = true;
        $('#BranchFilter').append(` Civil Engineering`);
        branch[7] = "Civil Engineering";
    } else {
        branch[7] = null;
    }

    if ($('#CatGEN').is(':checked')) {
        isCat = true;
        $('#CategoryFilter').append(` General`);
        cat[0] = "General";
    } else {
        cat[0] = "";
    }
    if ($('#CatSC').is(':checked')) {
        isCat = true;
        $('#CategoryFilter').append(` SC`);
        cat[1] = "SC";
    } else {
        cat[1] = "";
    }
    if ($('#CatST').is(':checked')) {
        isCat = true;
        $('#CategoryFilter').append(` ST`);
        cat[2] = "ST";
    } else {
        cat[2] = "";
    }
    if ($('#CatOBC').is(':checked')) {
        isCat = true;
        $('#CategoryFilter').append(` OBC`);
        cat[3] = "OBC";
    } else {
        cat[3] = "";
    }
    if ($('#CatOTHER').is(':checked')) {
        isCat = true;
        $('#CategoryFilter').append(` Others`);
        cat[4] = "Others";
    } else {
        cat[4] = "";
    }

    if ($('#isMale').is(':checked')) {
        isGen = true;
        $('#GenderFilter').append(` Male`);
        gen[0] = "Male";
    } else {
        gen[0] = "";
    }
    if ($('#isFemale').is(':checked')) {
        isGen = true;
        $('#GenderFilter').append(` Female`);
        gen[1] = "Female";
    } else {
        gen[1] = "";
    }


    //NEED TO MAKE THIS VAR CORRECT

    if ($('#searchCGPA') != null || $('#searchCGPA') != "") {
        isCG = true;
        $('#CGPAFilter').append(` ` + $('#searchCGPA').val());
    }

    var filterObject = {
        Branch: branch,
        Category: cat,
        Gender: gen,
        GEN: $('#CatGEN').is(':checked'),
        SC: $('#CatSC').is(':checked'),
        ST: $('#CatST').is(':checked'),
        OBC: $('#CatOBC').is(':checked'),
        OTHER: $('#CatOTHER').is(':checked'),
        Male: $('#isMale').is(':checked'),
        Female: $('#isFemale').is(':checked'),
        CGPA: $('#searchCGPA').val()
    };
    console.log(filterObject);

    $.ajax({
        method: "GET",
        datatype: "json",
        data: filterObject,
        url: "http://localhost:3000/api/fetch/data/searchStudent"

    })
}


/*************************************** Dashboard specific functions are here ***************************************/










/*************************************** Stundent Section specific functions are here ***************************************/
