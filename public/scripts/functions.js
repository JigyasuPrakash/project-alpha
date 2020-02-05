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
            if (window.location.pathname === "/dashboard/student/result") {
                getData();
            } else if (window.location.pathname === "/dashboard/student") {
                getStudentAnalytics()
            }
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

function getData() {
    $.ajax({
        method: "GET",
        dataType: "json",
        data: { email: localStorage.getItem("toSearch") },
        url: "/api/fetch/data/getStudentByEmail",
        error: function () {
            console.log('error occured');
        },

        success: function (data) {

            student = JSON.parse(data);

            if (data != null && student[0].length != 0) {

                $('#findResult').attr('style', 'visibility: visible')

                console.log(student);

                var stu = student[0][0];

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

                stu = student[1][0];

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


                stu = student[2][0];

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

                stu = student[3][0];

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

            else {
                $('#findResult').empty();
                $('#findResult').attr('style', 'visibility: visible')
                $('#findResult').append(`
                <div class="alert alert-danger fade show" role="alert">No student found with email ID ${localStorage.getItem("toSearch")}</div>
                `);
            }



        }
    })
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

    filterObject['Branch'] = branch;
    filterObject['Category'] = cat;
    filterObject['Gender'] = gen;
    filterObject['GEN'] = $('#CatGEN').is(':checked');
    filterObject['SC'] = $('#CatSC').is(':checked');
    filterObject['ST'] = $('#CatST').is(':checked');
    filterObject['OBC'] = $('#CatOBC').is(':checked');
    filterObject['OTHER'] = $('#CatOTHER').is(':checked');
    var isGender = false;
    if ($('#isMale').is(':checked') || $('#isFemale').is(':checked')) {
        isGender = true;
    }
    filterObject['isGender'] = isGender;
    filterObject['CGPA'] = $('#searchCGPA').val();
    //console.log($('#searchCGPA').val());

}

function search() {
    console.log(filterObject);
    $.ajax({
        method: "GET",
        datatype: "json",
        data: filterObject,
        url: "http://localhost:3000/api/fetch/data/searchStudent",
        error: function () {
            console.log('error occured');
        },
        success: function (data) {
            data = JSON.parse(data);
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

function getStudentAnalytics() {
    $.ajax({
        method: "GET",
        datatype: "json",
        data: { EmailId: "amburemm@rknec.edu" },
        url: "/api/fetch/data/getStudentAnalytics",
        error: function () {
            console.log('error occured');
        },
        success: function (data) {
            data = JSON.parse(data);
            console.log(data);

            var ctx = document.getElementById('sgpaAnalytics').getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['SEM 1 SGPA', 'SEM 2 SGPA', 'SEM 3 SGPA', 'SEM 4 SGPA', 'SEM 5 SGPA', 'SEM 6 SGPA', 'SEM 7 SGPA', 'SEM 8 SGPA'],
                    datasets: [{
                        barPercentage: 0.1,
                        barThickness: 2,
                        maxBarThickness: 2,
                        label: 'Sem-wise SGPA',
                        data: data,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)'
                        ],
                        borderWidth: 1

                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });
        }
    });
}