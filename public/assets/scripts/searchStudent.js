function loadUI(isAdmin) {
    const normalUI = document.getElementById('normalUI');
    const adminUI = document.getElementById('adminUI');
    if (isAdmin) {
        adminUI.style.display = 'block';
    } else {
        normalUI.style.display = 'block';
    }
}

function searchStudent() {

}

function createObject() {
    $('#filterResults').empty();

    var branch=[];
    var cat=[];

    if($('#searchStudentCS').is(':checked')) {
        branch[0]="Computer Science and  Engineering";
    } else {
        branch[0]="";
    }
    if($('#searchStudentIT').is(':checked')) {
        branch[1]="Information Technology";
    } else {
        branch[1]="";
    }
    if($('#searchStudentIND').is(':checked')) {
        branch[2]="Industrial Engineering";
    } else {
        branch[2]="";
    }
    if($('#searchStudentELEC').is(':checked')) {
    branch[3]="Electrical Engineering";
    } else {
        branch[3]="";
    }
    if($('#searchStudentEDT').is(':checked')) {
        branch[4]="Electronics Design Technology";
    } else {
        branch[4]="";
    }
    if($('#searchStudentEN').is(':checked')) {
        branch[5]="Electronics Engineering";
    } else {
        branch[5]="";
    }
    if($('#searchStudentENT').is(':checked')) {
        branch[6]="Electronics and Communication Engineering";
    } else {
        branch[6]="";
    }
    if($('#searchStudentCIV').is(':checked')) {
        branch[7]="Civil Engineering";
    } else {
        branch[7]="";
    }

    var filterObject={
        Branch: branch,
        GEN: $('#CatGEN').is(':checked'),
        SC: $('#CatSC').is(':checked'),
        ST: $('#CatST').is(':checked'),
        OBC: $('#CatOBC').is(':checked'),
        OTHER: $('#CatOTHER').is(':checked'),
        HsYES: $('#HsYES').is(':checked'),
        HsNO: $('#HsNO').is(':checked'),
        HsMAYBE: $('#HsMAYBE').is(':checked'),
        Male: $('#isMale').is(':checked'),
        Female: $('#isFemale').is(':checked'),
        CGPA: $('#searchCGPA').val()
    };
    //console.log(filterObject);

    let studentPersonal = db.collection('student_personal_details');
    let studentPlacement = db.collection('student_placement_details');
    let studentCurrentAcademic = db.collection('student_current_academic_details');
    let studentPreviousAcedemic = db.collection('student_previous_academic_details');

    let query = studentPersonal.where('Branch', 'in', filterObject['Branch']).get()
    .then(snapshot => {
        if (snapshot.empty) {
        //console.log('No matching documents.');
        return;
        }

        $('#filterResults').empty();

        snapshot.forEach(doc => {
            let s=doc.data();
            

            if(filterObject['GEN']) {
                if(s.Category=="General") {
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
            }

            if(filterObject['SC']) {
                if(s.Category=="SC") {
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
            }

            if(filterObject['ST']) {
                if(s.Category=="ST") {
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
            }

            if(filterObject['OBC']) {
                if(s.Category=="OBC") {
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
            }

            

            if(filterObject['OTHER']) {
                if(s.Category=="Others") {
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
            }

            if(filterObject['Male']) {
                if(s.Gender=="Male") {
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
            }

            if(filterObject['Female']) {
                if(s.Gender=="Female") {
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
            }

            if(filterObject['CGPA']!=null) {
                if(s.CGPA>=filterObject['CGPA']) {
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
            }

            if(filterObject['CGPA']==null && !filterObject['GEN'] && !filterObject['SC'] && !filterObject['ST'] && !filterObject['OBC'] && !filterObject['OTHER'] && !filterObject['Male'] && !filterObject['Female'] ){
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


