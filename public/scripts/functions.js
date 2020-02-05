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


var filterObject = {
    Branch: null,
    Category: null,
    Gender: null,
    isGender: null,
    GEN: null,
    SC: null,
    ST: null,
    OBC: null,
    OTHER: null,
    CGPA: null
};

function createObject() {
    var branch = [], gen = [], cat = [];
    var isBranch, isCat, isGen, isCG;
    
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
        branch.push("Computer Science and  Engineering");
    }
    if ($('#searchStudentIT').is(':checked')) {
        isBranch = true;
        $('#BranchFilter').append(` Information Technology`);
        branch.push("Information Technology");
    }
    if ($('#searchStudentIND').is(':checked')) {
        isBranch = true;
        $('#BranchFilter').append(` Industrial Engineering`);
        branch.push("Industrial Engineering");
    }
    if ($('#searchStudentELEC').is(':checked')) {
        isBranch = true;
        $('#BranchFilter').append(` Electrical Engineering`);
        branch.push("Electrical Engineering");
    }
    if ($('#searchStudentEDT').is(':checked')) {
        isBranch = true;
        $('#BranchFilter').append(` Electronics and Design Technology`);
        branch.push("Electronics Design Technology");
    }
    if ($('#searchStudentEN').is(':checked')) {
        isBranch = true;
        $('#BranchFilter').append(` Electronics Engineering`);
        branch.push("Electronics Engineering");
    }
    if ($('#searchStudentENT').is(':checked')) {
        isBranch = true;
        $('#BranchFilter').append(` Electronics and Communication Engineering`);
        branch.push("Electronics and Communication Engineering");
    }
    if ($('#searchStudentCIV').is(':checked')) {
        isBranch = true;
        $('#BranchFilter').append(` Civil Engineering`);
        branch.push("Civil Engineering");
    }

    if ($('#CatGEN').is(':checked')) {
        isCat = true;
        $('#CategoryFilter').append(` General`);
        cat.push("General");
    }
    if ($('#CatSC').is(':checked')) {
        isCat = true;
        $('#CategoryFilter').append(` SC`);
        cat.push("SC");
    }
    if ($('#CatST').is(':checked')) {
        isCat = true;
        $('#CategoryFilter').append(` ST`);
        cat.push("ST");
    }
    if ($('#CatOBC').is(':checked')) {
        isCat = true;
        $('#CategoryFilter').append(` OBC`);
        cat.push("OBC");
    }
    if ($('#CatOTHER').is(':checked')) {
        isCat = true;
        $('#CategoryFilter').append(` Others`);
        cat.push("Others");
    }

    if ($('#isMale').is(':checked')) {
        isGen = true;
        $('#GenderFilter').append(` Male`);
        gen.push("Male");
    }
    if ($('#isFemale').is(':checked')) {
        isGen = true;
        $('#GenderFilter').append(` Female`);
        gen.push("Female");
    }


    //NEED TO MAKE THIS VAR CORRECT

    if ($('#searchCGPA') != null || $('#searchCGPA') != "") {
        isCG = true;
        $('#CGPAFilter').append(` ` + $('#searchCGPA').val());
    }

    filterObject['Branch']= branch;
    filterObject['Category']= cat;
    filterObject['Gender']= gen;
    filterObject['GEN']= $('#CatGEN').is(':checked');
    filterObject['SC']=$('#CatSC').is(':checked');
    filterObject['ST']= $('#CatST').is(':checked');
    filterObject['OBC']= $('#CatOBC').is(':checked');
    filterObject['OTHER']= $('#CatOTHER').is(':checked');
    var isGender=false;
    if($('#isMale').is(':checked') || $('#isFemale').is(':checked')) {
        isGender=true;
    }
    filterObject['isGender']= isGender;
    filterObject['CGPA']=$('#searchCGPA').val();
    //console.log($('#searchCGPA').val());

}

function search() {
    console.log(filterObject);
    $.ajax({
        method: "GET",
        datatype: "json",
        data: filterObject,
        url: "http://localhost:3000/api/fetch/data/searchStudent" ,
        error: function() {
            console.log('error occured');
        },
        success: function(data) {
            data=JSON.parse(data);
            data.forEach(element => {
                $('#filterResults').append(`
                <tr>
                    <td>${element.Fullname}</td>
                    <td>${element.Branch}</td>
                    <td>${element.Shift}</td>
                    <td>${element.CGPA}</td>
                    <td>${element.Gender}</td>
                    <td>${element.EmailId}</td>
                    <td>${element.Category}</td>
                </tr>
                `);
            });
            //console.log(data);
        }
    });

}



/*************************************** Dashboard specific functions are here ***************************************/










/*************************************** Stundent Section specific functions are here ***************************************/
