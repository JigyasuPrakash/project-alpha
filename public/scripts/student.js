$(document).ready(function () {
    console.log("Document is ready")
    $('#userName').text(localStorage.getItem('name'));
    $('#userEmail').text(localStorage.getItem('email'));
});

function getStudent() {
    const search = document.getElementById("textToSearch").value;
    console.log(search);
    if (search != "" && search != null) {
        localStorage.setItem("toSearch", search + "@rknec.edu");
        goTo('/dashboard/student/result');
    }
}

//clear search result:error once you go back it's value remains same
function goTo(path) {
    $("#display_loading").css('visibility', 'visible');
    var getReq = localStorage.getItem('accessId');
    var actualPath = '';
    if (path == '#') {
        actualPath = path;
    }else if(path == 'login'){
        actualPath = '../../login';
    } else {
        actualPath = path + '?accessId=' + getReq;
    }
    window.location.href = actualPath;
}
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
        branch[0] = "";
    }
    if ($('#searchStudentIT').is(':checked')) {
        isBranch = true;
        $('#BranchFilter').append(` Information Technology`);
        branch[1] = "Information Technology";
    } else {
        branch[1] = "";
    }
    if ($('#searchStudentIND').is(':checked')) {
        isBranch = true;
        $('#BranchFilter').append(` Industrial Engineering`);
        branch[2] = "Industrial Engineering";
    } else {
        branch[2] = "";
    }
    if ($('#searchStudentELEC').is(':checked')) {
        isBranch = true;
        $('#BranchFilter').append(` Electrical Engineering`);
        branch[3] = "Electrical Engineering";
    } else {
        branch[3] = "";
    }
    if ($('#searchStudentEDT').is(':checked')) {
        isBranch = true;
        $('#BranchFilter').append(` Electronics and Design Technology`);
        branch[4] = "Electronics Design Technology";
    } else {
        branch[4] = "";
    }
    if ($('#searchStudentEN').is(':checked')) {
        isBranch = true;
        $('#BranchFilter').append(` Electronics Engineering`);
        branch[5] = "Electronics Engineering";
    } else {
        branch[5] = "";
    }
    if ($('#searchStudentENT').is(':checked')) {
        isBranch = true;
        $('#BranchFilter').append(` Electronics and Communication Engineering`);
        branch[6] = "Electronics and Communication Engineering";
    } else {
        branch[6] = "";
    }
    if ($('#searchStudentCIV').is(':checked')) {
        isBranch = true;
        $('#BranchFilter').append(` Civil Engineering`);
        branch[7] = "Civil Engineering";
    } else {
        branch[7] = "";
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
    //console.log(filterObject);

    let studentPersonal = db.collection('student_personal_details');
    let studentPlacement = db.collection('student_placement_details');
    let studentCurrentAcademic = db.collection('student_current_academic_details');
    let studentPreviousAcedemic = db.collection('student_previous_academic_details');

    console.log("Branch" + isBranch);
    console.log("CGPA" + isCG);
    console.log("CATEGORY" + isCat);
    console.log("GENDER" + isGen);

    if (!isBranch && !isCat && !isGen && !isCG) {
        var objToSend={};
        let query = studentPersonal.get()
            .then(snapshot => {
                if (snapshot.empty) {
                    $("#display_loading").css('visibility', 'hidden');
                    console.log('No matching documents.');
                    return;
                }

                $('#filterResults').empty();
                
                snapshot.forEach(doc => {
                    let s = doc.data();
                    $("#display_loading").css('visibility', 'hidden');
                    $('#filterResults').append(`
                    <tr>
                        <td>${s.Fullname}</td>
                        <td>${s.Branch}</td>
                        <td>${s.Shift}</td>
                        <td>${s.CGPA}</td>
                        <td>${s.Gender}</td>
                        <td>${s.EmailId}</td>
                        <td>${s.Category}</td>
                    </tr>
                `)
                });
            })
            .catch(err => {
                console.log('Error getting documents', err);
                $("#display_loading").css('visibility', 'hidden');
            });
    }



    if (isBranch && !isCat && !isGen && !isCG) {
        let query = studentPersonal.where('Branch', 'in', filterObject['Branch']).get()
            .then(snapshot => {
                if (snapshot.empty) {
                    $("#display_loading").css('visibility', 'hidden');
                    //console.log('No matching documents.');
                    return;
                }
                $("#display_loading").css('visibility', 'hidden');
                snapshot.forEach(doc => {
                    let s = doc.data();
                    console.log(doc.id, '=>', doc.data());
                    $("#display_loading").css('visibility', 'hidden');
                    $('#filterResults').append(`
                    <tr>
                        <td>${s.Fullname}</td>
                        <td>${s.Branch}</td>
                        <td>${s.Shift}</td>
                        <td>${s.CGPA}</td>
                        <td>${s.Gender}</td>
                        <td>${s.EmailId}</td>
                        <td>${s.Category}</td>
                    </tr>
                `)
                });
            })
            .catch(err => {
                console.log('Error getting documents', err);
                $("#display_loading").css('visibility', 'hidden');
            });
    }

    if (!isBranch && !isCat && isGen && !isCG) {
        let query = studentPersonal.where('Gender', 'in', filterObject['Gender']).get()
            .then(snapshot => {
                if (snapshot.empty) {
                    $("#display_loading").css('visibility', 'hidden');
                    //console.log('No matching documents.');
                    return;
                }

                snapshot.forEach(doc => {
                    let s = doc.data();

                    console.log(doc.id, '=>', doc.data());
                    $("#display_loading").css('visibility', 'hidden');
                    $('#filterResults').append(`
                    <tr>
                        <td>${s.Fullname}</td>
                        <td>${s.Branch}</td>
                        <td>${s.Shift}</td>
                        <td>${s.CGPA}</td>
                        <td>${s.Gender}</td>
                        <td>${s.EmailId}</td>
                        <td>${s.Category}</td>
                    </tr>
                `)
                });
            })
            .catch(err => {
                console.log('Error getting documents', err);
                $("#display_loading").css('visibility', 'hidden');
            });
    }

    if (!isBranch && isCat && !isGen && !isCG) {
        let query = studentPersonal.where('Category', 'in', filterObject['Category']).get()
            .then(snapshot => {
                if (snapshot.empty) {
                    //console.log('No matching documents.');
                    $("#display_loading").css('visibility', 'hidden');
                    return;
                }

                snapshot.forEach(doc => {
                    let s = doc.data();

                    console.log(doc.id, '=>', doc.data());
                    $("#display_loading").css('visibility', 'hidden');
                    $('#filterResults').append(`
                    <tr>
                        <td>${s.Fullname}</td>
                        <td>${s.Branch}</td>
                        <td>${s.Shift}</td>
                        <td>${s.CGPA}</td>
                        <td>${s.Gender}</td>
                        <td>${s.EmailId}</td>
                        <td>${s.Category}</td>
                    </tr>
                `)
                });
            })
            .catch(err => {
                console.log('Error getting documents', err);
                $("#display_loading").css('visibility', 'hidden');
            });
    }

    if (!isBranch && !isCat && !isGen && isCG) {
        let query = studentPersonal.where('CGPA', '>=', parseInt(filterObject['CGPA'])).get()
            .then(snapshot => {
                if (snapshot.empty) {
                    $("#display_loading").css('visibility', 'hidden');
                    console.log('No matching documents.');
                    return;
                }

                snapshot.forEach(doc => {
                    let s = doc.data();

                    console.log(doc.id, '=>', doc.data());
                    $("#display_loading").css('visibility', 'hidden');
                    $('#filterResults').append(`
                    <tr>
                        <td>${s.Fullname}</td>
                        <td>${s.Branch}</td>
                        <td>${s.Shift}</td>
                        <td>${s.CGPA}</td>
                        <td>${s.Gender}</td>
                        <td>${s.EmailId}</td>
                        <td>${s.Category}</td>
                    </tr>
                    `)
                });
            })
            .catch(err => {
                console.log('Error getting documents', err);
                $("#display_loading").css('visibility', 'hidden');
            });
    }

    if (isBranch && isCat && !isGen && !isCG) {
        let query = studentPersonal.where('Branch', 'in', filterObject['Branch']).get()
            .then(snapshot => {
                if (snapshot.empty) {
                    //console.log('No matching documents.');
                    $("#display_loading").css('visibility', 'hidden');
                    return;
                }

                snapshot.forEach(doc => {
                    let s = doc.data();
                    if (filterObject['Category'].includes(s.Category)) {

                        console.log(doc.id, '=>', doc.data());
                        $("#display_loading").css('visibility', 'hidden');
                        $('#filterResults').append(`
                        <tr>
                            <td>${s.Fullname}</td>
                            <td>${s.Branch}</td>
                            <td>${s.Shift}</td>
                            <td>${s.CGPA}</td>
                            <td>${s.Gender}</td>
                            <td>${s.EmailId}</td>
                            <td>${s.Category}</td>
                        </tr>
                    `)
                    }
                });
            })
            .catch(err => {
                console.log('Error getting documents', err);
                $("#display_loading").css('visibility', 'hidden');
            });
    }

    if (isBranch && !isCat && !isGen && isCG) {
        let query = studentPersonal.where('Branch', 'in', filterObject['Branch']).get()
            .then(snapshot => {
                if (snapshot.empty) {
                    //console.log('No matching documents.');
                    $("#display_loading").css('visibility', 'hidden');
                    return;
                }

                snapshot.forEach(doc => {
                    let s = doc.data();
                    if (filterObject['CGPA'] <= s.CGPA) {
                        console.log(doc.id, '=>', doc.data());
                        $("#display_loading").css('visibility', 'hidden');
                        $('#filterResults').append(`
                        <tr>
                            <td>${s.Fullname}</td>
                            <td>${s.Branch}</td>
                            <td>${s.Shift}</td>
                            <td>${s.CGPA}</td>
                            <td>${s.Gender}</td>
                            <td>${s.EmailId}</td>
                            <td>${s.Category}</td>
                        </tr>
                    `)
                    }
                });
            })
            .catch(err => {
                console.log('Error getting documents', err);
                $("#display_loading").css('visibility', 'hidden');
            });
    }

    if (!isBranch && isCat && isGen && !isCG) {
        let query = studentPersonal.where('Gender', 'in', filterObject['Gender']).get()
            .then(snapshot => {
                if (snapshot.empty) {
                    //console.log('No matching documents.');
                    $("#display_loading").css('visibility', 'hidden');
                    return;
                }

                snapshot.forEach(doc => {
                    let s = doc.data();

                    if (filterObject['Category'].includes(s.Category)) {

                        console.log(doc.id, '=>', doc.data());
                        $("#display_loading").css('visibility', 'hidden');
                        $('#filterResults').append(`
                        <tr>
                            <td>${s.Fullname}</td>
                            <td>${s.Branch}</td>
                            <td>${s.Shift}</td>
                            <td>${s.CGPA}</td>
                            <td>${s.Gender}</td>
                            <td>${s.EmailId}</td>
                            <td>${s.Category}</td>
                        </tr>
                    `)
                    }
                });
            })
            .catch(err => {
                console.log('Error getting documents', err);
                $("#display_loading").css('visibility', 'hidden');
            });
    }

    if (!isBranch && !isCat && isGen && isCG) {
        let query = studentPersonal.where('Gender', 'in', filterObject['Gender']).get()
            .then(snapshot => {
                if (snapshot.empty) {
                    //console.log('No matching documents.');
                    $("#display_loading").css('visibility', 'hidden');
                    return;
                }

                snapshot.forEach(doc => {
                    let s = doc.data();

                    if (filterObject['CGPA'] <= s.CGPA) {

                        console.log(doc.id, '=>', doc.data());
                        $("#display_loading").css('visibility', 'hidden');
                        $('#filterResults').append(`
                        <tr>
                            <td>${s.Fullname}</td>
                            <td>${s.Branch}</td>
                            <td>${s.Shift}</td>
                            <td>${s.CGPA}</td>
                            <td>${s.Gender}</td>
                            <td>${s.EmailId}</td>
                            <td>${s.Category}</td>
                        </tr>
                    `)
                    }
                });
            })
            .catch(err => {
                console.log('Error getting documents', err);
                $("#display_loading").css('visibility', 'hidden');
            });
    }

    if (!isBranch && isCat && isGen && !isCG) {
        let query = studentPersonal.where('Category', 'in', filterObject['Category']).get()
            .then(snapshot => {
                if (snapshot.empty) {
                    //console.log('No matching documents.');
                    $("#display_loading").css('visibility', 'hidden');
                    return;
                }

                snapshot.forEach(doc => {
                    let s = doc.data();

                    if (filterObject['CGPA'] <= s.CGPA) {

                        console.log(doc.id, '=>', doc.data());
                        $("#display_loading").css('visibility', 'hidden');
                        $('#filterResults').append(`
                        <tr>
                            <td>${s.Fullname}</td>
                            <td>${s.Branch}</td>
                            <td>${s.Shift}</td>
                            <td>${s.CGPA}</td>
                            <td>${s.Gender}</td>
                            <td>${s.EmailId}</td>
                            <td>${s.Category}</td>
                        </tr>
                    `)
                    }
                });
            })
            .catch(err => {
                console.log('Error getting documents', err);
                $("#display_loading").css('visibility', 'hidden');
            });
    }

    if (isBranch && !isCat && isGen && !isCG) {
        let query = studentPersonal.where('Branch', 'in', filterObject['Branch']).get()
            .then(snapshot => {
                if (snapshot.empty) {
                    //console.log('No matching documents.');
                    $("#display_loading").css('visibility', 'hidden');
                    return;
                }

                snapshot.forEach(doc => {
                    let s = doc.data();

                    if (filterObject['Gender'].includes(s.Gender)) {

                        console.log(doc.id, '=>', doc.data());
                        $("#display_loading").css('visibility', 'hidden');
                        $('#filterResults').append(`
                        <tr>
                            <td>${s.Fullname}</td>
                            <td>${s.Branch}</td>
                            <td>${s.Shift}</td>
                            <td>${s.CGPA}</td>
                            <td>${s.Gender}</td>
                            <td>${s.EmailId}</td>
                            <td>${s.Category}</td>
                        </tr>
                    `)
                    }
                });
            })
            .catch(err => {
                console.log('Error getting documents', err);
                $("#display_loading").css('visibility', 'hidden');
            });
    }


    if (!isBranch && isCat && isGen && isCG) {
        let query = studentPersonal.where('Category', 'in', filterObject['Category']).get()
            .then(snapshot => {
                if (snapshot.empty) {
                    //console.log('No matching documents.');
                    $("#display_loading").css('visibility', 'hidden');
                    return;
                }

                snapshot.forEach(doc => {
                    let s = doc.data();

                    if (filterObject['CGPA'] <= s.CGPA && filterObject['Gender'].includes(s.Gender)) {

                        console.log(doc.id, '=>', doc.data());
                        $("#display_loading").css('visibility', 'hidden');
                        $('#filterResults').append(`
                        <tr>
                            <td>${s.Fullname}</td>
                            <td>${s.Branch}</td>
                            <td>${s.Shift}</td>
                            <td>${s.CGPA}</td>
                            <td>${s.Gender}</td>
                            <td>${s.EmailId}</td>
                            <td>${s.Category}</td>
                        </tr>
                    `)
                    }
                });
            })
            .catch(err => {
                console.log('Error getting documents', err);
                $("#display_loading").css('visibility', 'hidden');
            });
    }

    if (isBranch && isCat && isGen && !isCG) {
        let query = studentPersonal.where('Branch', 'in', filterObject['Branch']).get()
            .then(snapshot => {
                if (snapshot.empty) {
                    //console.log('No matching documents.');
                    $("#display_loading").css('visibility', 'hidden');
                    return;
                }

                snapshot.forEach(doc => {
                    let s = doc.data();

                    if (filterObject['Gender'].includes(s.Gender) && filterObject['Category'].includes(s.Category)) {

                        console.log(doc.id, '=>', doc.data());
                        $("#display_loading").css('visibility', 'hidden');
                        $('#filterResults').append(`
                        <tr>
                            <td>${s.Fullname}</td>
                            <td>${s.Branch}</td>
                            <td>${s.Shift}</td>
                            <td>${s.CGPA}</td>
                            <td>${s.Gender}</td>
                            <td>${s.EmailId}</td>
                            <td>${s.Category}</td>
                        </tr>
                    `)
                    }
                });
            })
            .catch(err => {
                console.log('Error getting documents', err);
                $("#display_loading").css('visibility', 'hidden');
            });
    }

    if (isBranch && !isCat && isGen && isCG) {
        let query = studentPersonal.where('Branch', 'in', filterObject['Branch']).get()
            .then(snapshot => {
                if (snapshot.empty) {
                    //console.log('No matching documents.');
                    $("#display_loading").css('visibility', 'hidden');
                    return;
                }

                snapshot.forEach(doc => {
                    let s = doc.data();

                    if (filterObject['Gender'].includes(s.Gender) && filterObject['CGPA'] <= s.CGPA) {

                        console.log(doc.id, '=>', doc.data());
                        $("#display_loading").css('visibility', 'hidden');
                        $('#filterResults').append(`
                        <tr>
                            <td>${s.Fullname}</td>
                            <td>${s.Branch}</td>
                            <td>${s.Shift}</td>
                            <td>${s.CGPA}</td>
                            <td>${s.Gender}</td>
                            <td>${s.EmailId}</td>
                            <td>${s.Category}</td>
                        </tr>
                    `)
                    }
                });
            })
            .catch(err => {
                console.log('Error getting documents', err);
                $("#display_loading").css('visibility', 'hidden');
            });
    }

    if (isBranch && isCat && !isGen && isCG) {
        let query = studentPersonal.where('Branch', 'in', filterObject['Branch']).get()
            .then(snapshot => {
                if (snapshot.empty) {
                    //console.log('No matching documents.');
                    $("#display_loading").css('visibility', 'hidden');
                    return;
                }

                snapshot.forEach(doc => {
                    let s = doc.data();

                    if (filterObject['Category'].includes(s.Category) && filterObject['CGPA'] <= s.CGPA) {

                        console.log(doc.id, '=>', doc.data());
                        $("#display_loading").css('visibility', 'hidden');
                        $('#filterResults').append(`
                        <tr>
                            <td>${s.Fullname}</td>
                            <td>${s.Branch}</td>
                            <td>${s.Shift}</td>
                            <td>${s.CGPA}</td>
                            <td>${s.Gender}</td>
                            <td>${s.EmailId}</td>
                            <td>${s.Category}</td>
                        </tr>
                    `)
                    }
                });
            })
            .catch(err => {
                console.log('Error getting documents', err);
                $("#display_loading").css('visibility', 'hidden');
            });
    }

    if (isBranch && isCat && isGen && isCG) {
        let query = studentPersonal.where('Branch', 'in', filterObject['Branch']).get()
            .then(snapshot => {
                if (snapshot.empty) {
                    //console.log('No matching documents.');
                    $("#display_loading").css('visibility', 'hidden');
                    return;
                }

                snapshot.forEach(doc => {
                    let s = doc.data();

                    if (filterObject['Gender'].includes(s.Gender) && filterObject['Category'].includes(s.Category) && filterObject['CGPA'] <= s.CGPA) {

                        console.log(doc.id, '=>', doc.data());
                        $("#display_loading").css('visibility', 'hidden');
                        $('#filterResults').append(`
                        <tr>
                            <td>${s.Fullname}</td>
                            <td>${s.Branch}</td>
                            <td>${s.Shift}</td>
                            <td>${s.CGPA}</td>
                            <td>${s.Gender}</td>
                            <td>${s.EmailId}</td>
                            <td>${s.Category}</td>
                        </tr>
                    `)
                    }
                });
            })
            .catch(err => {
                console.log('Error getting documents', err);
                $("#display_loading").css('visibility', 'hidden');
            });
    }

}

function exportToCSV(){
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
    let studentPersonal = db.collection('student_personal_details');
    console.log("Branch" + isBranch);
    console.log("CGPA" + isCG);
    console.log("CATEGORY" + isCat);
    console.log("GENDER" + isGen);
    var csvFile="Name,Branch Name,Shift,CGPA,Gender,Email-Id,Category\r\n";
    if (!isBranch && !isCat && !isGen && !isCG) {
        var objToSend={};
        let query = studentPersonal.get()
            .then(snapshot => {
                if (snapshot.empty) {
                    console.log('No matching documents.');
                    return;
                }

                $('#filterResults').empty();

                snapshot.forEach(doc => {
                    let s = doc.data();
                    csvFile=csvFile.concat(s.Fullname+","+s.Branch+","+s.Shift+","+s.CGPA+","+s.Gender+","+s.EmailId+","+s.Category+"\r\n");
                   
                });
                let csvContent = "data:text/csv;charset=utf-8,"+csvFile;
                var encodedUri = encodeURI(csvContent);
                var link = document.createElement("a");
                link.setAttribute("href", encodedUri);
                link.setAttribute("download", "my_data.csv");
                document.body.appendChild(link); 
                link.click();
            })
            .catch(err => {
                console.log('Error getting documents', err);
            });
    }

    if (isBranch && !isCat && !isGen && !isCG) {
        let query = studentPersonal.where('Branch', 'in', filterObject['Branch']).get()
            .then(snapshot => {
                if (snapshot.empty) {
                    //console.log('No matching documents.');
                    return;
                }

                snapshot.forEach(doc => {
                    let s = doc.data();
                    
                    csvFile=csvFile.concat(s.Fullname+","+s.Branch+","+s.Shift+","+s.CGPA+","+s.Gender+","+s.EmailId+","+s.Category+"\r\n");   
                });
                let csvContent = "data:text/csv;charset=utf-8,"+csvFile;
                var encodedUri = encodeURI(csvContent);
                var link = document.createElement("a");
                link.setAttribute("href", encodedUri);
                link.setAttribute("download", "my_data.csv");
                document.body.appendChild(link); // Required for FF
                link.click();
            })
            .catch(err => {
                console.log('Error getting documents', err);
            });
    }

    if (!isBranch && !isCat && isGen && !isCG) {
        let query = studentPersonal.where('Gender', 'in', filterObject['Gender']).get()
            .then(snapshot => {
                if (snapshot.empty) {
                    //console.log('No matching documents.');
                    return;
                }

                snapshot.forEach(doc => {
                    let s = doc.data();
                    console.log('765');
                    console.log(doc.id, '=>', doc.data());
                    csvFile=csvFile.concat(s.Fullname+","+s.Branch+","+s.Shift+","+s.CGPA+","+s.Gender+","+s.EmailId+","+s.Category+"\r\n");   
                });
                let csvContent = "data:text/csv;charset=utf-8,"+csvFile;
                var encodedUri = encodeURI(csvContent);
                var link = document.createElement("a");
                link.setAttribute("href", encodedUri);
                link.setAttribute("download", "my_data.csv");
                document.body.appendChild(link); // Required for FF
                link.click();
            })
            .catch(err => {
                console.log('Error getting documents', err);
            });
    }

    if (!isBranch && isCat && !isGen && !isCG) {
        let query = studentPersonal.where('Category', 'in', filterObject['Category']).get()
            .then(snapshot => {
                if (snapshot.empty) {
                    //console.log('No matching documents.');
                    return;
                }

                snapshot.forEach(doc => {
                    let s = doc.data();
                    console.log('785');
                    csvFile=csvFile.concat(s.Fullname+","+s.Branch+","+s.Shift+","+s.CGPA+","+s.Gender+","+s.EmailId+","+s.Category+"\r\n");   
                });
                let csvContent = "data:text/csv;charset=utf-8,"+csvFile;
                var encodedUri = encodeURI(csvContent);
                var link = document.createElement("a");
                link.setAttribute("href", encodedUri);
                link.setAttribute("download", "my_data.csv");
                document.body.appendChild(link); // Required for FF
                link.click();
            })
            .catch(err => {
                console.log('Error getting documents', err);
            });
    }

    if (!isBranch && !isCat && !isGen && isCG) {
        let query = studentPersonal.where('CGPA', '>=', parseInt(filterObject['CGPA'])).get()
            .then(snapshot => {
                if (snapshot.empty) {
                    console.log('No matching documents.');
                    return;
                }

                snapshot.forEach(doc => {
                let s = doc.data();
                console.log('804');
                csvFile=csvFile.concat(s.Fullname+","+s.Branch+","+s.Shift+","+s.CGPA+","+s.Gender+","+s.EmailId+","+s.Category+"\r\n");   
                });
                let csvContent = "data:text/csv;charset=utf-8,"+csvFile;
                var encodedUri = encodeURI(csvContent);
                var link = document.createElement("a");
                link.setAttribute("href", encodedUri);
                link.setAttribute("download", "my_data.csv");
                document.body.appendChild(link); // Required for FF
                link.click();
            })
            .catch(err => {
                console.log('Error getting documents', err);
            });
    }

    if (isBranch && isCat && !isGen && !isCG) {
        let query = studentPersonal.where('Branch', 'in', filterObject['Branch']).get()
            .then(snapshot => {
                if (snapshot.empty) {
                    //console.log('No matching documents.');
                    return;
                }

                snapshot.forEach(doc => {
                    let s = doc.data();
                    if (filterObject['Category'].includes(s.Category)) {
                        console.log('824');
                        console.log(doc.id, '=>', doc.data());
                        csvFile=csvFile.concat(s.Fullname+","+s.Branch+","+s.Shift+","+s.CGPA+","+s.Gender+","+s.EmailId+","+s.Category+"\r\n");   
                    }
                });
                let csvContent = "data:text/csv;charset=utf-8,"+csvFile;
                var encodedUri = encodeURI(csvContent);
                var link = document.createElement("a");
                link.setAttribute("href", encodedUri);
                link.setAttribute("download", "my_data.csv");
                document.body.appendChild(link); // Required for FF
                link.click();
            })
            .catch(err => {
                console.log('Error getting documents', err);
            });
    }

    if (isBranch && !isCat && !isGen && isCG) {
        
        let query = studentPersonal.where('Branch', 'in', filterObject['Branch']).get()
            .then(snapshot => {
                if (snapshot.empty) {
                    //console.log('No matching documents.');
                    return;
                }

                snapshot.forEach(doc => {
                    let s = doc.data();
                    if (filterObject['CGPA'] <= s.CGPA) {
                        console.log('846');
                        console.log(s.Fullname+","+s.Branch+","+s.Shift+","+s.CGPA+","+s.Gender+","+s.EmailId+","+s.Category+"\r\n");
                        csvFile=csvFile.concat(s.Fullname+","+s.Branch+","+s.Shift+","+s.CGPA+","+s.Gender+","+s.EmailId+","+s.Category+"\n");   
                        console.log("csvFile"+csvFile);
                        
                    }
                });
                let csvContent = "data:text/csv;charset=utf-8,"+csvFile;
                var encodedUri = encodeURI(csvContent);
                var link = document.createElement("a");
                link.setAttribute("href", encodedUri);
                link.setAttribute("download", "my_data.csv");
                document.body.appendChild(link); // Required for FF
                link.click();
                console.log("csvFile"+csvFile);
            })
            .catch(err => {
                console.log('Error getting documents', err);
            });
            
            console.log('hi');
    }

    if (!isBranch && isCat && isGen && !isCG) {
        let query = studentPersonal.where('Gender', 'in', filterObject['Gender']).get()
            .then(snapshot => {
                if (snapshot.empty) {
                    //console.log('No matching documents.');
                    return;
                }

                snapshot.forEach(doc => {
                    let s = doc.data();

                    if (filterObject['Category'].includes(s.Category)) {
                        console.log('868');
                        csvFile=csvFile.concat(s.Fullname+","+s.Branch+","+s.Shift+","+s.CGPA+","+s.Gender+","+s.EmailId+","+s.Category+"\r\n");   
                    }
                });
                let csvContent = "data:text/csv;charset=utf-8,"+csvFile;
                var encodedUri = encodeURI(csvContent);
                var link = document.createElement("a");
                link.setAttribute("href", encodedUri);
                link.setAttribute("download", "my_data.csv");
                document.body.appendChild(link); // Required for FF
                link.click();
            })
            .catch(err => {
                console.log('Error getting documents', err);
            });
    }

    if (!isBranch && !isCat && isGen && isCG) {
        let query = studentPersonal.where('Gender', 'in', filterObject['Gender']).get()
            .then(snapshot => {
                if (snapshot.empty) {
                    //console.log('No matching documents.');
                    return;
                }

                snapshot.forEach(doc => {
                    let s = doc.data();

                    if (filterObject['CGPA'] <= s.CGPA) {
                        console.log('890');
                        csvFile=csvFile.concat(s.Fullname+","+s.Branch+","+s.Shift+","+s.CGPA+","+s.Gender+","+s.EmailId+","+s.Category+"\r\n");   
                    }
                    
                });
                let csvContent = "data:text/csv;charset=utf-8,"+csvFile;
                var encodedUri = encodeURI(csvContent);
                var link = document.createElement("a");
                link.setAttribute("href", encodedUri);
                link.setAttribute("download", "my_data.csv");
                document.body.appendChild(link); // Required for FF
                link.click();
            })
            .catch(err => {
                console.log('Error getting documents', err);
            });
    }

    if (!isBranch && isCat && isGen && !isCG) {
        let query = studentPersonal.where('Category', 'in', filterObject['Category']).get()
            .then(snapshot => {
                if (snapshot.empty) {
                    //console.log('No matching documents.');
                    return;
                }

                snapshot.forEach(doc => {
                    let s = doc.data();
                    if (filterObject['CGPA'] <= s.CGPA) {
                        console.log('911');
                        csvFile=csvFile.concat(s.Fullname+","+s.Branch+","+s.Shift+","+s.CGPA+","+s.Gender+","+s.EmailId+","+s.Category+"\r\n");   
                    }
                });
                let csvContent = "data:text/csv;charset=utf-8,"+csvFile;
                var encodedUri = encodeURI(csvContent);
                var link = document.createElement("a");
                link.setAttribute("href", encodedUri);
                link.setAttribute("download", "my_data.csv");
                document.body.appendChild(link); // Required for FF
                link.click();
            })
            .catch(err => {
                console.log('Error getting documents', err);
            });
    }

    if (isBranch && !isCat && isGen && !isCG) {
        let query = studentPersonal.where('Branch', 'in', filterObject['Branch']).get()
            .then(snapshot => {
                if (snapshot.empty) {
                    //console.log('No matching documents.');
                    return;
                }

                snapshot.forEach(doc => {
                    let s = doc.data();

                    if (filterObject['Gender'].includes(s.Gender)) {
                        console.log('933');
                        csvFile=csvFile.concat(s.Fullname+","+s.Branch+","+s.Shift+","+s.CGPA+","+s.Gender+","+s.EmailId+","+s.Category+"\r\n");   
                    }
                });
                let csvContent = "data:text/csv;charset=utf-8,"+csvFile;
                var encodedUri = encodeURI(csvContent);
                var link = document.createElement("a");
                link.setAttribute("href", encodedUri);
                link.setAttribute("download", "my_data.csv");
                document.body.appendChild(link); // Required for FF
                link.click();
            })
            .catch(err => {
                console.log('Error getting documents', err);
            });
    }


    if (!isBranch && isCat && isGen && isCG) {
        let query = studentPersonal.where('Category', 'in', filterObject['Category']).get()
            .then(snapshot => {
                if (snapshot.empty) {
                    //console.log('No matching documents.');
                    return;
                }

                snapshot.forEach(doc => {
                    let s = doc.data();

                    if (filterObject['CGPA'] <= s.CGPA && filterObject['Gender'].includes(s.Gender)) {
                        console.log('956');
                        csvFile=csvFile.concat(s.Fullname+","+s.Branch+","+s.Shift+","+s.CGPA+","+s.Gender+","+s.EmailId+","+s.Category+"\r\n");   
                    }
                });
                let csvContent = "data:text/csv;charset=utf-8,"+csvFile;
                var encodedUri = encodeURI(csvContent);
                var link = document.createElement("a");
                link.setAttribute("href", encodedUri);
                link.setAttribute("download", "my_data.csv");
                document.body.appendChild(link); // Required for FF
                link.click();
            })
            .catch(err => {
                console.log('Error getting documents', err);
            });
    }

    if (isBranch && isCat && isGen && !isCG) {
        let query = studentPersonal.where('Branch', 'in', filterObject['Branch']).get()
            .then(snapshot => {
                if (snapshot.empty) {
                    //console.log('No matching documents.');
                    return;
                }

                snapshot.forEach(doc => {
                    let s = doc.data();

                    if (filterObject['Gender'].includes(s.Gender) && filterObject['Category'].includes(s.Category)) {
                        console.log('978');
                        csvFile=csvFile.concat(s.Fullname+","+s.Branch+","+s.Shift+","+s.CGPA+","+s.Gender+","+s.EmailId+","+s.Category+"\r\n");   
                    }
                });
                let csvContent = "data:text/csv;charset=utf-8,"+csvFile;
                var encodedUri = encodeURI(csvContent);
                var link = document.createElement("a");
                link.setAttribute("href", encodedUri);
                link.setAttribute("download", "my_data.csv");
                document.body.appendChild(link); // Required for FF
                link.click();
            })
            .catch(err => {
                console.log('Error getting documents', err);
            });
    }

    if (isBranch && !isCat && isGen && isCG) {
        let query = studentPersonal.where('Branch', 'in', filterObject['Branch']).get()
            .then(snapshot => {
                if (snapshot.empty) {
                    //console.log('No matching documents.');
                    return;
                }

                snapshot.forEach(doc => {
                    let s = doc.data();

                    if (filterObject['Gender'].includes(s.Gender) && filterObject['CGPA'] <= s.CGPA) {
                        console.log('1000');
                        csvFile=csvFile.concat(s.Fullname+","+s.Branch+","+s.Shift+","+s.CGPA+","+s.Gender+","+s.EmailId+","+s.Category+"\r\n");   
                    }
                });
                let csvContent = "data:text/csv;charset=utf-8,"+csvFile;
                var encodedUri = encodeURI(csvContent);
                var link = document.createElement("a");
                link.setAttribute("href", encodedUri);
                link.setAttribute("download", "my_data.csv");
                document.body.appendChild(link); // Required for FF
                link.click();
            })
            .catch(err => {
                console.log('Error getting documents', err);
            });
    }

    if (isBranch && isCat && !isGen && isCG) {
        let query = studentPersonal.where('Branch', 'in', filterObject['Branch']).get()
            .then(snapshot => {
                if (snapshot.empty) {
                    //console.log('No matching documents.');
                    return;
                }

                snapshot.forEach(doc => {
                    let s = doc.data();

                    if (filterObject['Category'].includes(s.Category) && filterObject['CGPA'] <= s.CGPA) {
                        console.log('1022');
                        csvFile=csvFile.concat(s.Fullname+","+s.Branch+","+s.Shift+","+s.CGPA+","+s.Gender+","+s.EmailId+","+s.Category+"\r\n");   
                    }
                });
                let csvContent = "data:text/csv;charset=utf-8,"+csvFile;
                var encodedUri = encodeURI(csvContent);
                var link = document.createElement("a");
                link.setAttribute("href", encodedUri);
                link.setAttribute("download", "my_data.csv");
                document.body.appendChild(link); // Required for FF
                link.click();
            })
            .catch(err => {
                console.log('Error getting documents', err);
            });
    }

    if (isBranch && isCat && isGen && isCG) {
        let query = studentPersonal.where('Branch', 'in', filterObject['Branch']).get()
            .then(snapshot => {
                if (snapshot.empty) {
                    //console.log('No matching documents.');
                    return;
                }

                snapshot.forEach(doc => {
                    let s = doc.data();

                    if (filterObject['Gender'].includes(s.Gender) && filterObject['Category'].includes(s.Category) && filterObject['CGPA'] <= s.CGPA) {
                        console.log('1044');
                        csvFile=csvFile.concat(s.Fullname+","+s.Branch+","+s.Shift+","+s.CGPA+","+s.Gender+","+s.EmailId+","+s.Category+"\r\n");   
                    }
                });
                let csvContent = "data:text/csv;charset=utf-8,"+csvFile;
                var encodedUri = encodeURI(csvContent);
                var link = document.createElement("a");
                link.setAttribute("href", encodedUri);
                link.setAttribute("download", "my_data.csv");
                document.body.appendChild(link); // Required for FF
                link.click();
            })
            .catch(err => {
                console.log('Error getting documents', err);
            });
    }
    // console.log("csvFile"+csvFile);
    // console.log("branch"+filterObject['Branch']);
    // let csvContent = "data:text/csv;charset=utf-8,"+csvFile;
    // var encodedUri = encodeURI(csvContent);
    // //window.open(encodedUri);
    // //var encodedUri = encodeURI(csvContent);
    // var link = document.createElement("a");
    // link.setAttribute("href", encodedUri);
    // link.setAttribute("download", "my_data.csv");
    // document.body.appendChild(link); // Required for FF
    // link.click();
}

function searchIndividual() {
    const search = localStorage.getItem('toSearch')
    let student = db.collection('student_personal_details').doc(search);

    var found;
    let findStudent = student.get()
        .then(doc => {
            if (!doc.exists) {
                found = false;
                $('#findResult').empty();
                $('#findResult').attr('style', 'visibility: visible')
                $('#findResult').append(`
                <div class="alert alert-danger fade show" role="alert">No student found with email ID ${search}</div>
            `);
                console.log('no doc');
            }
            else {
                $('#findResult').attr('style', 'visibility: visible')
                stu = doc.data();
                $('#studentName').text(stu.Fullname);
                $('#firstName').text("First Name: " + stu.FirstName);
                $('#middleName').text("Middle Name: " + stu.MiddleName);
                $('#lastName').text("Last Name: " + stu.LastName);
                $('#emailID').text("Email ID: " + stu.EmailId);
                $('#altEmailID').text("Alternate Email ID: " + stu.AlternateEmailId);
                $('#branch').text("Branch: " + stu.Branch);
                $('#shift').text("Shift :" + stu.Shift);
                $('#classRollNo').text("Classs Roll Number: " + stu.ClassRollNo);
                $('#nationality').text("Nationality: " + stu.Nationality);
                $('#aadharNo').text("Aadhar No: " + stu.AadharNo);
                $('#dateOfBirth').text("Date of Birth: " + stu.DateOfBirth);
                $('#mobNo').text("Mobile No: " + stu.MobileNo);
                $('#parentPhoneNo').text("Parent Phone No: " + stu.ParentPhoneNo);
                $('#permanentAddress').text("Permanent Address: " + stu.PermanentAddress);
                $('#permanentPINCode').text("Permanent PIN Code: " + stu.PermanentPINCode);
                $('#enrollmentNo').text("Enroll No: " + stu.EnrollmentNo);
                $('#gender').text("Gender: " + stu.Gender);
                $('#category').text("Category: " + stu.Category);
                $('#yearOfAdmission').text("Year of Admission: " + stu.YearOfAdmission);

                $('#permanentCity').text("Permanent City: " + stu.PermanentCity);
                $('#CGPA').text("CGPA: " + stu.CGPA);
                $('#avatar').attr('src', stu.Avatar);
            }
        })
        .catch(err => {
            console.log(err);
        });

    student = db.collection('student_previous_academic_details').doc(search);

    findStudent = student.get()
        .then(doc => {
            if (!doc.exists) {
                console.log('no doc');
            }
            else {
                stu = doc.data();
                $('#MHCETscore').text("MHCET Score: " + stu.MHCETscore);
                $('#JEEscore').text("JEE Score: " + stu.JEEscore);
                $('#SSC_Board').text("SSC Board: " + stu.SSC_Board);
                $('#SSC_Year').text("SSC Year of Passing: " + stu.SSC_Year);
                $('#SSC_TotalMarks').text("SSC Total Marks: " + stu.SSC_TotalMarks);
                $('#SSC_MarksOutOf').text("SSC Marks Out of: " + stu.SSC_MarksOutOf);
                $('#SSC_Percentage').text("SSC Percentage: " + stu.SSC_Percentage);
                $('#HSC_Board').text("HSC Board: " + stu.HSC_Board);
                $('#HSC_Year').text("HSC Year of Passing: " + stu.HSC_Year);
                $('#HSC_TotalMarks').text("HSC Total Marks: " + stu.HSC_TotalMarks);
                $('#HSC_MarksOutOf').text("HSC Marks Out of: " + stu.HSC_MarksOutOf);
                $('#HSC_Percentage').text("HSC PErcentage: " + stu.HSC_Percentage);
                $('#Diploma_Board').text("Diploma Board: " + stu.Diploma_Board);
                $('#Diploma_Branch').text("Dilpoma Branch: " + stu.Diploma_Branch);
                $('#Diploma_Year').text("Diploma Year of Passing: " + stu.Diploma_Year);
                $('#Diploma_TotalMarks').text("Diploma Total Marks: " + stu.Diploma_TotalMarks);
                $('#Diploma_MarksOutOf').text("Diploma Marks Out of :" + stu.Diploma_MarksOutOf);
                $('#Diploma_Percentage').text("Diploma Percentage: " + stu.Diploma_Percentage);
                $('#Degree_Board').text("Current Degree Board: " + stu.Degree_Board);
                $('#Gap_10_12DipPrv').text("Gap between 10th and 12th/Diploma: " + stu.Gap_10_12Dip);
                $('#Gap_12Dip_EnggPrv').text("Gap betweem 12th/Diploma and Engg: " + stu.Gap_12Dip_Engg);
            }

        })
        .catch(err => {
            console.log(err);
        });

    student = db.collection('student_current_academic_details').doc(search);

    findStudent = student.get()
        .then(doc => {
            if (!doc.exists) {
                console.log('no doc');
            }
            else {
                stu = doc.data();
                $('#enrollment_No').text("Enrollment No: " + stu.Enrollment_No);
                $('#emailIDCA').text("Email ID: " + stu.EmailId);
                $('#CGPACA').text("CGPA: " + stu.CGPA);
                $('#degree_Board').text("Degree Board: " + stu.Degree_Board);
                $('#Sem1PassYear').text("Sem 1 Pass Year: " + stu.Sem1PassYear);
                $('#Sem1SGPA').text("Sem 1 SGPA: " + stu.Sem1SGPA);
                $('#Sem1Attempt1BacklogCount').text("Sem 1 Attempt Backlog Count: " + stu.Sem1Attempt1BacklogCount);
                $('#Sem1Attempt2BacklogCount').text("Sem 2 Attempt Backlog Count: " + stu.Sem1Attempt2BacklogCount);
                $('#Sem1Attempt3BacklogCount').text("Sem 3 Attempt Backlog Count: " + stu.Sem1Attempt3BacklogCount);
                $('#Sem1Attempt4BacklogCount').text("Sem 4 Attempt Backlog Count: " + stu.Sem1Attempt4BacklogCount);
                $('#Sem2PassYear').text("Sem 2 Pass Year: " + stu.Sem2PassYear);
                $('#Sem2SGPA').text("Sem 2 SGPA: " + stu.Sem2SGPA);
                $('#Sem2Attempt1BacklogCount').text("Sem 2 Attempt 1 Backlog Count: " + stu.Sem2Attempt1BacklogCount);
                $('#Sem2Attempt2BacklogCount').text("Sem 2 Attempt 2 Backlog Count: " + stu.Sem2Attempt2BacklogCount);
                $('#Sem2Attempt3BacklogCount').text("Sem 2 Attempt 3 Backlog Count: " + stu.Sem2Attempt3BacklogCount);
                $('#Sem2Attempt4BacklogCount').text("Sem 2 Attempt 4 Backlog Count: " + stu.Sem2Attempt4BacklogCount);
                $('#Sem2CurrentBacklogCount').text("Sem 2 Current Backlog Count: " + stu.Sem2CurrentBacklogCount);
                $('#Sem3PassYear').text("Sem 3 Pass Year: " + stu.Sem3PassYear);
                $('#Sem3SGPA').text("Sem 3 SGPA: " + stu.Sem3SGPA);
                $('#Sem3Attempt1BacklogCount').text("Sem 3 Attempt 1 Backlog Count: " + stu.Sem3Attempt1BacklogCount);
                $('#Sem3Attempt2BacklogCount').text("Sem 3 Attempt 2 Backlog Count: " + stu.Sem3Attempt2BacklogCount);
                $('#Sem3Attempt3BacklogCount').text("Sem 3 Attempt 3 Backlog Count: " + stu.Sem3Attempt3BacklogCount);
                $('#Sem3Attempt4BacklogCount').text("Sem 3 Attempt 4 Backlog Count: " + stu.Sem3Attempt4BacklogCount);
                $('#Sem3CurrentBacklogCount').text("Sem 3 Current Backlog Count: " + stu.Sem3CurrentBacklogCount);
                $('#Sem4PassYear').text("Sem 4 Pass Year: " + stu.Sem4PassYear);
                $('#Sem4SGPA').text("Sem 4 SGPA: " + stu.Sem4SGPA);
                $('#Sem4Attempt1BacklogCount').text("Sem 4 Attempt 1 Backlog Count: " + stu.Sem4Attempt1BacklogCount);
                $('#Sem4Attempt2BacklogCount').text("Sem 4 Attempt 2 Backlog Count: " + stu.Sem4Attempt2BacklogCount);
                $('#Sem4Attempt3BacklogCount').text("Sem 4 Attempt 3 Backlog Count: " + stu.Sem4Attempt3BacklogCount);
                $('#Sem4Attempt4BacklogCount').text("Sem 4 Attempt 4 Backlog Count: " + stu.Sem4Attempt4BacklogCount);
                $('#Sem4CurrentBacklogCount').text("Sem 4 Current Backlog Count: " + stu.Sem4CurrentBacklogCount);
                $('#Sem5PassYear').text("Sem 5 Pass Year: " + stu.Sem5PassYear);
                $('#Sem5SGPA').text("Sem 5 SGPA: " + stu.Sem5SGPA);
                $('#Sem5Attempt1BacklogCount').text("Sem 5 Attempt 1 Backlog Count: " + stu.Sem5Attempt1BacklogCount);
                $('#Sem5Attempt2BacklogCount').text("Sem 5 Attempt 2 Backlog Count: " + stu.Sem5Attempt2BacklogCount);
                $('#Sem5Attempt3BacklogCount').text("Sem 5 Attempt 3 Backlog Count: " + stu.Sem5Attempt3BacklogCount);
                $('#Sem5Attempt4BacklogCount').text("Sem 5 Attempt 4 Backlog Count: " + stu.Sem5Attempt4BacklogCount);
                $('#Sem5CurrentBacklogCount').text("Sem 5 Current Backlog Count: " + stu.Sem5CurrentBacklogCount);
                $('#Sem6PassYear').text("Sem 6 Pass Year: " + stu.Sem6PassYear);
                $('#Sem6SGPA').text("Sem 6 SGPA: " + stu.Sem6SGPA);
                $('#Sem6Attempt1BacklogCount').text("Sem 6 Attempt 1 Backlog Count: " + stu.Sem6Attempt1BacklogCount);
                $('#Sem6Attempt2BacklogCount').text("Sem 6 Attempt 2 Backlog Count: " + stu.Sem6Attempt2BacklogCount);
                $('#Sem6Attempt3BacklogCount').text("Sem 6 Attempt 3 Backlog Count: " + stu.Sem6Attempt3BacklogCount);
                $('#Sem6Attempt4BacklogCount').text("Sem 6 Attempt 4 Backlog Count: " + stu.Sem6Attempt4BacklogCount);
                $('#Sem6CurrentBacklogCount').text("Sem 6 Current Backlog Count: " + stu.Sem6CurrentBacklogCount);
                $('#Sem7PassYear').text("Sem 7 Pass Year: " + stu.Sem7PassYear);
                $('#Sem7SGPA').text("Sem 7 SGPA: " + stu.Sem7SGPA);
                $('#Sem7Attempt1BacklogCount').text("Sem 7 Attempt 1 Backlog Count: " + stu.Sem7Attempt1BacklogCount);
                $('#Sem7Attempt2BacklogCount').text("Sem 7 Attempt 2 Backlog Count: " + stu.Sem7Attempt2BacklogCount);
                $('#Sem7Attempt3BacklogCount').text("Sem 7 Attempt 3 Backlog Count: " + stu.Sem7Attempt3BacklogCount);
                $('#Sem7Attempt4BacklogCount').text("Sem 7 Attempt 4 Backlog Count: " + stu.Sem7Attempt4BacklogCount);
                $('#Sem7CurrentBacklogCount').text("Sem 7 Current Backlog Count: " + stu.Sem7CurrentBacklogCount);
                $('#Sem8PassYear').text("Sem 8 Pass Year: " + stu.Sem8PassYear);
                $('#Sem8SGPA').text("Sem 8 SGPA: " + stu.Sem8SGPA);
                $('#Sem8Attempt1BacklogCount').text("Sem 8 Attempt 1 Backlog Count: " + stu.Sem8Attempt1BacklogCount);
                $('#Sem8Attempt2BacklogCount').text("Sem 8 Attempt 2 Backlog Count: " + stu.Sem8Attempt2BacklogCount);
                $('#Sem8Attempt3BacklogCount').text("Sem 8 Attempt 3 Backlog Count: " + stu.Sem8Attempt3BacklogCount);
                $('#Sem8Attempt4BacklogCount').text("Sem 8 Attempt 4 Backlog Count: " + stu.Sem8Attempt4BacklogCount);
                $('#Gap_in_EnggPL').text("Gap in Engg: " + stu.Gap_in_Engg);
            }

        })
        .catch(err => {
            console.log(err);
        });

    student = db.collection('student_placement_details').doc(search);

    findStudent = student.get()
        .then(doc => {
            if (!doc.exists) {
                console.log('no doc');
            }
            else {
                stu = doc.data();
                $('#enrollmentno').text("Enrollment No: " + stu.EnrollmentNo);
                $('#enrollment_no').text("Full Enrollment No: " + stu.Enrollment_No);
                $('#Choice_Out_of_three_companies').text("Choice out of Accenture/Infosys/Wipro: " + stu.Choice_Out_of_three_companies);
                $('#Company1').text("1st Company: " + stu.Company1);
                $('#Company2').text("2nd Company: " + stu.Company2);
                $('#Company3').text("3rd Company: " + stu.Company3);
                $('#Company4').text("4th Company: " + stu.Company4);
                $('#Gap_10_12Dip').text("Gap between 10th and 12th/Diploma: " + stu.Gap_10_12Dip);
                $('#Gap_12Dip_Engg').text("Gap between 12th/Diploma and Engg: " + stu.Gap_12Dip_Engg);
                $('#Gap_in_Engg').text("Gap in Engg: " + stu.Gap_in_Engg);
                $('#Internship').text("1st Internship: " + stu.Internship);
                $('#Internship2').text("2nd Internship: " + stu.Internship2);
                $('#Higher_Studies').text("Higher Studies: " + stu.Higher_Studies);
                $('#Higher_Studies_Details').text("Higher Studies Details: " + stu.Higher_Studies_Details);
                $('#Enterpreunership').text("Entrepreneurship: " + stu.Enterpreunership);
                $('#Total_Number_of_Dead_ATKT').text("Total No of Dead ATKT: " + stu.Total_Number_of_Dead_ATKT);
                $('#Total_Number_of_Gaps').text("Total No of Gaps: " + stu.Total_Number_of_Gaps);
                $('#Total_Number_of_Gaps1').text("Total No of Gaps1: " + stu.Total_Number_of_Gaps1);
                $('#Total_Number_of_Live_ATKT').text("Total No of Live ATKT: " + stu.Total_Number_of_Live_ATKT);
            }

        })
        .catch(err => {
            console.log(err);
        });

}
