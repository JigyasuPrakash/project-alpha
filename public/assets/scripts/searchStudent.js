function loadUI(isAdmin) {
    const normalUI = document.getElementById('normalUI');
    const adminUI = document.getElementById('adminUI');
    if (isAdmin) {
        adminUI.style.display = 'block';
    } else {
        normalUI.style.display = 'block';
    }
}

function getStudent() {
    const search = document.getElementById("textToSearch").value;
    console.log(search);
    if (search != "" && search != null) {
        localStorage.setItem("toSearch", search + "@rknec.edu");
        window.location.href = "./searchResult.html";
    }
}

function searchStudent() {

}

function createObject() {
    $('#filterResults').empty();

    var branch = [], gen = [], cat = [];
    var isBranch = false, isCat = false, isGen = false, isCG = false;

    if ($('#searchStudentCS').is(':checked')) {
        isBranch = true;
        branch[0] = "Computer Science and  Engineering";
    } else {
        branch[0] = "";
    }
    if ($('#searchStudentIT').is(':checked')) {
        isBranch = true;
        branch[1] = "Information Technology";
    } else {
        branch[1] = "";
    }
    if ($('#searchStudentIND').is(':checked')) {
        isBranch = true;
        branch[2] = "Industrial Engineering";
    } else {
        branch[2] = "";
    }
    if ($('#searchStudentELEC').is(':checked')) {
        isBranch = true;
        branch[3] = "Electrical Engineering";
    } else {
        branch[3] = "";
    }
    if ($('#searchStudentEDT').is(':checked')) {
        isBranch = true;
        branch[4] = "Electronics Design Technology";
    } else {
        branch[4] = "";
    }
    if ($('#searchStudentEN').is(':checked')) {
        isBranch = true;
        branch[5] = "Electronics Engineering";
    } else {
        branch[5] = "";
    }
    if ($('#searchStudentENT').is(':checked')) {
        isBranch = true;
        branch[6] = "Electronics and Communication Engineering";
    } else {
        branch[6] = "";
    }
    if ($('#searchStudentCIV').is(':checked')) {
        isBranch = true;
        branch[7] = "Civil Engineering";
    } else {
        branch[7] = "";
    }

    if ($('#CatGEN').is(':checked')) {
        isCat = true;
        cat[0] = "General";
    } else {
        cat[0] = "";
    }
    if ($('#CatSC').is(':checked')) {
        isCat = true;
        cat[1] = "SC";
    } else {
        cat[1] = "";
    }
    if ($('#CatST').is(':checked')) {
        isCat = true;
        cat[2] = "ST";
    } else {
        cat[2] = "";
    }
    if ($('#CatOBC').is(':checked')) {
        isCat = true;
        cat[3] = "OBC";
    } else {
        cat[3] = "";
    }
    if ($('#CatOTHER').is(':checked')) {
        isCat = true;
        cat[4] = "Others";
    } else {
        cat[4] = "";
    }

    if ($('#isMale').is(':checked')) {
        isGen = true;
        gen[0] = "Male";
    } else {
        gen[0] = "";
    }
    if ($('#isFemale').is(':checked')) {
        isGen = true;
        gen[1] = "Female";
    } else {
        gen[1] = "";
    }


    //NEED TO MAKE THIS VAR CORRECT

    if($('#searchCGPA')!=null || $('#searchCGPA')!="") {
        isCG=true;
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

    console.log("Branch"+isBranch);
    console.log("CGPA"+isCG);
    console.log("CATEGORY"+isCat);
    console.log("GENDER"+isGen);

    if (!isBranch && !isCat && !isGen && !isCG) {

        let query = studentPersonal.get()
            .then(snapshot => {
                if (snapshot.empty) {
                    console.log('No matching documents.');
                    return;
                }

                $('#filterResults').empty();

                snapshot.forEach(doc => {
                    let s = doc.data();
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

                    console.log(doc.id, '=>', doc.data());
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

                    console.log(doc.id, '=>', doc.data());
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

                    console.log(doc.id, '=>', doc.data());
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

                    console.log(doc.id, '=>', doc.data());
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
                    if(filterObject['Category'].includes(s.Category)) {

                        console.log(doc.id, '=>', doc.data());
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
                    if(filterObject['CGPA']<=s.CGPA) {

                        console.log(doc.id, '=>', doc.data());
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
            });
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

                    if(filterObject['Category'].includes(s.Category)){
 
                        console.log(doc.id, '=>', doc.data());
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

                    if(filterObject['CGPA']<=s.CGPA){
 
                        console.log(doc.id, '=>', doc.data());
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

                    if(filterObject['CGPA']<=s.CGPA){
 
                        console.log(doc.id, '=>', doc.data());
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

                    if(filterObject['Gender'].includes(s.Gender)){
 
                        console.log(doc.id, '=>', doc.data());
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

                    if(filterObject['CGPA']<=s.CGPA && filterObject['Gender'].includes(s.Gender)){
 
                        console.log(doc.id, '=>', doc.data());
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

                    if(filterObject['Gender'].includes(s.Gender) && filterObject['Category'].includes(s.Category)){
 
                        console.log(doc.id, '=>', doc.data());
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

                    if(filterObject['Gender'].includes(s.Gender) && filterObject['CGPA']<=s.CGPA){
 
                        console.log(doc.id, '=>', doc.data());
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

                    if(filterObject['Category'].includes(s.Category) && filterObject['CGPA']<=s.CGPA){
 
                        console.log(doc.id, '=>', doc.data());
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

                    if(filterObject['Gender'].includes(s.Gender) && filterObject['Category'].includes(s.Category) && filterObject['CGPA']<=s.CGPA){
 
                        console.log(doc.id, '=>', doc.data());
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
            });
    }

}


