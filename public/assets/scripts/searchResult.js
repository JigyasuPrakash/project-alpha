const search=localStorage.getItem('toSearch')
let student = db.collection('student_personal_details').doc(search);

let getStudent=student.get()
.then(doc => {
    if(!doc.exists) {
        console.log('no doc');
    }
    else {
        stu=doc.data();
        $('#studentName').text(stu.Fullname);
        $('#firstName').text("First Name: "+stu.FirstName);
        $('#middleName').text("Middle Name: "+stu.MiddleName);
        $('#lastName').text("Last Name: "+stu.LastName);
        $('#emailID').text("Email ID: "+stu.EmailId);
        $('#altEmailID').text("Alternate Email ID: "+stu.AlternateEmailId);
        $('#branch').text("Branch: "+stu.Branch);
        $('#shift').text("Shift :"+stu.Shift);
        $('#classRollNo').text("Classs Roll Number: "+stu.ClassRollNo);
        $('#nationality').text("Nationality: "+stu.Nationality);
        $('#aadharNo').text("Aadhar No: "+stu.AadharNo);
        $('#dateOfBirth').text("Date of Birth: "+stu.DateOfBirth);
        $('#mobNo').text("Mobile No: "+stu.MobileNo);
        $('#parentPhoneNo').text("Parent Phone No: "+stu.ParentPhoneNo);
        $('#permanentAddress').text("Permanent Address: "+stu.PermanentAddress);
        $('#permanentPINCode').text("Permanent PIN Code: "+stu.PermanentPINCode);
        $('#enrollmentNo').text("Enroll No: "+stu.EnrollmentNo);
        $('#gender').text("Gender: "+stu.Gender);
        $('#category').text("Category: "+stu.Category);
        $('#yearOfAdmission').text("Year of Admission: "+stu.YearOfAdmission);
        
        $('#permanentCity').text("Permanent City: "+stu.PermanentCity);
        $('#CGPA').text("CGPA: "+stu.CGPA);
        $('#avatar').attr('src',stu.Avatar);
    }
})
.catch(err => {
    console.log(err);
});

student = db.collection('student_previous_academic_details').doc(search);

getStudent=student.get()
.then(doc => {
    if(!doc.exists) {
        console.log('no doc');
    }
    else {
        stu=doc.data();
        $('#MHCETscore').text("MHCET Score: "+stu.MHCETscore);
        $('#JEEscore').text("JEE Score: "+stu.JEEscore);
        $('#SSC_Board').text("SSC Board: "+stu.SSC_Board);
        $('#SSC_Year').text("SSC Year of Passing: "+stu.SSC_Year);
        $('#SSC_TotalMarks').text("SSC Total Marks: "+stu.SSC_TotalMarks);
        $('#SSC_MarksOutOf').text("SSC Marks Out of: "+stu.SSC_MarksOutOf);
        $('#SSC_Percentage').text("SSC Percentage: "+stu.SSC_Percentage);
        $('#HSC_Board').text("HSC Board: "+stu.HSC_Board);
        $('#HSC_Year').text("HSC Year of Passing: "+stu.HSC_Year);
        $('#HSC_TotalMarks').text("HSC Total Marks: "+stu.HSC_TotalMarks);
        $('#HSC_MarksOutOf').text("HSC Marks Out of: "+stu.HSC_MarksOutOf);
        $('#HSC_Percentage').text("HSC PErcentage: "+stu.HSC_Percentage);
        $('#Diploma_Board').text("Diploma Board: "+stu.Diploma_Board);
        $('#Diploma_Branch').text("Dilpoma Branch: "+stu.Diploma_Branch);
        $('#Diploma_Year').text("Diploma Year of Passing: "+stu.Diploma_Year);
        $('#Diploma_TotalMarks').text("Diploma Total Marks: "+stu.Diploma_TotalMarks);
        $('#Diploma_MarksOutOf').text("Diploma Marks Out of :"+stu.Diploma_MarksOutOf);
        $('#Diploma_Percentage').text("Diploma Percentage: "+stu.Diploma_Percentage);
        $('#Degree_Board').text("Current Degree Board: "+stu.Degree_Board);
        $('#Gap_10_12DipPrv').text("Gap between 10th and 12th/Diploma: "+stu.Gap_10_12Dip);
        $('#Gap_12Dip_EnggPrv').text("Gap betweem 12th/Diploma and Engg: "+stu.Gap_12Dip_Engg);
    }

})
.catch(err => {
        console.log(err);
});

student = db.collection('student_current_academic_details').doc(search);

getStudent=student.get()
.then(doc => {
    if(!doc.exists) {
        console.log('no doc');
    }
    else {
        stu=doc.data();
        $('#enrollment_No').text("Enrollment No: "+stu.Enrollment_No);
        $('#emailID').text("Email ID: "+stu.EmailId);
        $('#CGPA').text("CGPA: "+stu.CGPA);
        $('#degree_Board').text("Degree Board: "+stu.Degree_Board);
        $('#Sem1PassYear').text("Sem 1 Pass Year: "+stu.Sem1PassYear);
        $('#Sem1SGPA').text("Sem 1 SGPA: "+stu.Sem1SGPA);
        $('#Sem1Attempt1BacklogCount').text("Sem 1 Attempt Backlog Count: "+stu.Sem1Attempt1BacklogCount);
        $('#Sem1Attempt2BacklogCount').text("Sem 2 Attempt Backlog Count: "+stu.Sem1Attempt2BacklogCount);
        $('#Sem1Attempt3BacklogCount').text("Sem 3 Attempt Backlog Count: "+stu.Sem1Attempt3BacklogCount);
        $('#Sem1Attempt4BacklogCount').text("Sem 4 Attempt Backlog Count: "+stu.Sem1Attempt4BacklogCount);
        $('#Sem2PassYear').text("Sem 2 Pass Year: "+stu.Sem2PassYear);
        $('#Sem2SGPA').text("Sem 2 SGPA: "+stu.Sem2SGPA);
        $('#Sem2Attempt1BacklogCount').text("Sem 2 Attempt 1 Backlog Count: "+stu.Sem2Attempt1BacklogCount);
        $('#Sem2Attempt2BacklogCount').text("Sem 2 Attempt 2 Backlog Count: "+stu.Sem2Attempt2BacklogCount);
        $('#Sem2Attempt3BacklogCount').text("Sem 2 Attempt 3 Backlog Count: "+stu.Sem2Attempt3BacklogCount);
        $('#Sem2Attempt4BacklogCount').text("Sem 2 Attempt 4 Backlog Count: "+stu.Sem2Attempt4BacklogCount);
        $('#Sem2CurrentBacklogCount').text("Sem 2 Current Backlog Count: "+stu.Sem2CurrentBacklogCount);
        $('#Sem3PassYear').text("Sem 3 Pass Year: "+stu.Sem3PassYear);
        $('#Sem3SGPA').text("Sem 3 SGPA: "+stu.Sem3SGPA);
        $('#Sem3Attempt1BacklogCount').text("Sem 3 Attempt 1 Backlog Count: "+stu.Sem3Attempt1BacklogCount);
        $('#Sem3Attempt2BacklogCount').text("Sem 3 Attempt 2 Backlog Count: "+stu.Sem3Attempt2BacklogCount);
        $('#Sem3Attempt3BacklogCount').text("Sem 3 Attempt 3 Backlog Count: "+stu.Sem3Attempt3BacklogCount);
        $('#Sem3Attempt4BacklogCount').text("Sem 3 Attempt 4 Backlog Count: "+stu.Sem3Attempt4BacklogCount);
        $('#Sem3CurrentBacklogCount').text("Sem 3 Current Backlog Count: "+stu.Sem3CurrentBacklogCount);
        $('#Sem4PassYear').text("Sem 4 Pass Year: "+stu.Sem4PassYear);
        $('#Sem4SGPA').text("Sem 4 SGPA: "+stu.Sem4SGPA);
        $('#Sem4Attempt1BacklogCount').text("Sem 4 Attempt 1 Backlog Count: "+stu.Sem4Attempt1BacklogCount);
        $('#Sem4Attempt2BacklogCount').text("Sem 4 Attempt 2 Backlog Count: "+stu.Sem4Attempt2BacklogCount);
        $('#Sem4Attempt3BacklogCount').text("Sem 4 Attempt 3 Backlog Count: "+stu.Sem4Attempt3BacklogCount);
        $('#Sem4Attempt4BacklogCount').text("Sem 4 Attempt 4 Backlog Count: "+stu.Sem4Attempt4BacklogCount);
        $('#Sem4CurrentBacklogCount').text("Sem 4 Current Backlog Count: "+stu.Sem4CurrentBacklogCount);
        $('#Sem5PassYear').text("Sem 5 Pass Year: "+stu.Sem5PassYear);
        $('#Sem5SGPA').text("Sem 5 SGPA: "+stu.Sem5SGPA);
        $('#Sem5Attempt1BacklogCount').text("Sem 5 Attempt 1 Backlog Count: "+stu.Sem5Attempt1BacklogCount);
        $('#Sem5Attempt2BacklogCount').text("Sem 5 Attempt 2 Backlog Count: "+stu.Sem5Attempt2BacklogCount);
        $('#Sem5Attempt3BacklogCount').text("Sem 5 Attempt 3 Backlog Count: "+stu.Sem5Attempt3BacklogCount);
        $('#Sem5Attempt4BacklogCount').text("Sem 5 Attempt 4 Backlog Count: "+stu.Sem5Attempt4BacklogCount);
        $('#Sem5CurrentBacklogCount').text("Sem 5 Current Backlog Count: "+stu.Sem5CurrentBacklogCount);
        $('#Sem6PassYear').text("Sem 6 Pass Year: "+stu.Sem6PassYear);
        $('#Sem6SGPA').text("Sem 6 SGPA: "+stu.Sem6SGPA);
        $('#Sem6Attempt1BacklogCount').text("Sem 6 Attempt 1 Backlog Count: "+stu.Sem6Attempt1BacklogCount);
        $('#Sem6Attempt2BacklogCount').text("Sem 6 Attempt 2 Backlog Count: "+stu.Sem6Attempt2BacklogCount);
        $('#Sem6Attempt3BacklogCount').text("Sem 6 Attempt 3 Backlog Count: "+stu.Sem6Attempt3BacklogCount);
        $('#Sem6Attempt4BacklogCount').text("Sem 6 Attempt 4 Backlog Count: "+stu.Sem6Attempt4BacklogCount);
        $('#Sem6CurrentBacklogCount').text("Sem 6 Current Backlog Count: "+stu.Sem6CurrentBacklogCount);
        $('#Sem7PassYear').text("Sem 7 Pass Year: "+stu.Sem7PassYear);
        $('#Sem7SGPA').text("Sem 7 SGPA: "+stu.Sem7SGPA);
        $('#Sem7Attempt1BacklogCount').text("Sem 7 Attempt 1 Backlog Count: "+stu.Sem7Attempt1BacklogCount);
        $('#Sem7Attempt2BacklogCount').text("Sem 7 Attempt 2 Backlog Count: "+stu.Sem7Attempt2BacklogCount);
        $('#Sem7Attempt3BacklogCount').text("Sem 7 Attempt 3 Backlog Count: "+stu.Sem7Attempt3BacklogCount);
        $('#Sem7Attempt4BacklogCount').text("Sem 7 Attempt 4 Backlog Count: "+stu.Sem7Attempt4BacklogCount);
        $('#Sem7CurrentBacklogCount').text("Sem 7 Current Backlog Count: "+stu.Sem7CurrentBacklogCount);
        $('#Sem8PassYear').text("Sem 8 Pass Year: "+stu.Sem8PassYear);
        $('#Sem8SGPA').text("Sem 8 SGPA: "+stu.Sem8SGPA);
        $('#Sem8Attempt1BacklogCount').text("Sem 8 Attempt 1 Backlog Count: "+stu.Sem8Attempt1BacklogCount);
        $('#Sem8Attempt2BacklogCount').text("Sem 8 Attempt 2 Backlog Count: "+stu.Sem8Attempt2BacklogCount);
        $('#Sem8Attempt3BacklogCount').text("Sem 8 Attempt 3 Backlog Count: "+stu.Sem8Attempt3BacklogCount);
        $('#Sem8Attempt4BacklogCount').text("Sem 8 Attempt 4 Backlog Count: "+stu.Sem8Attempt4BacklogCount);
        $('#Gap_in_EnggPL').text("Gap in Engg: "+stu.Gap_in_Engg);        
    }

})
.catch(err => {
        console.log(err);
});

student = db.collection('student_placement_details').doc(search);

getStudent=student.get()
.then(doc => {
    if(!doc.exists) {
        console.log('no doc');
    }
    else {
        stu=doc.data();
        $('#enrollmentno').text("Enrollment No: "+stu.EnrollmentNo);
        $('#enrollment_no').text("Full Enrollment No: "+stu.Enrollment_No);
        $('#Choice_Out_of_three_companies').text("Choice out of Accenture/Infosys/Wipro: "+stu.Choice_Out_of_three_companies);
        $('#Company1').text("1st Company: "+stu.Company1);
        $('#Company2').text("2nd Company: "+stu.Company2);
        $('#Company3').text("3rd Company: "+stu.Company3);
        $('#Company4').text("4th Company: "+stu.Company4);
        $('#Gap_10_12Dip').text("Gap between 10th and 12th/Diploma: "+stu.Gap_10_12Dip);
        $('#Gap_12Dip_Engg').text("Gap between 12th/Diploma and Engg: "+stu.Gap_12Dip_Engg);
        $('#Gap_in_Engg').text("Gap in Engg: "+stu.Gap_in_Engg);
        $('#Internship').text("1st Internship: "+stu.Internship);
        $('#Internship2').text("2nd Internship: "+stu.Internship2);
        $('#Higher_Studies').text("Higher Studies: "+stu.Higher_Studies);
        $('#Higher_Studies_Details').text("Higher Studies Details: "+stu.Higher_Studies_Details);
        $('#Enterpreunership').text("Entrepreneurship: "+stu.Enterpreunership);
        $('#Total_Number_of_Dead_ATKT').text("Total No of Dead ATKT: "+stu.Total_Number_of_Dead_ATKT);
        $('#Total_Number_of_Gaps').text("Total No of Gaps: "+stu.Total_Number_of_Gaps);
        $('#Total_Number_of_Gaps1').text("Total No of Gaps1: "+stu.Total_Number_of_Gaps1);
        $('#Total_Number_of_Live_ATKT').text("Total No of Live ATKT: "+stu.Total_Number_of_Live_ATKT);
    }

})
.catch(err => {
        console.log(err);
});

function loadUI(isAdmin) {
    const normalUI = document.getElementById('normalUI');
    const adminUI = document.getElementById('adminUI');
    if (isAdmin) {
        adminUI.style.display = 'block';
    } else {
        normalUI.style.display = 'block';
    }
}