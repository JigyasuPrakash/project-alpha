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
        $('#Gap_10_12Dip').text("Gap between 10th and 12th/Diploma: "+stu.Gap_10_12Dip);
        $('#Gap_12Dip_Engg').text("Gap betweem 12th/Diploma and Engg: "+stu.Gap_12Dip_Engg);
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
        $('#studentName').text(stu.Fullname);
        $('#studentName').text(stu.Fullname);
        $('#studentName').text(stu.Fullname);
        $('#studentName').text(stu.Fullname);
        $('#studentName').text(stu.Fullname);
        $('#studentName').text(stu.Fullname);
        $('#studentName').text(stu.Fullname);
        $('#studentName').text(stu.Fullname);
        $('#studentName').text(stu.Fullname);
        $('#studentName').text(stu.Fullname);
        $('#studentName').text(stu.Fullname);
        $('#studentName').text(stu.Fullname);
        $('#studentName').text(stu.Fullname);
        $('#studentName').text(stu.Fullname);
        $('#studentName').text(stu.Fullname);
        $('#studentName').text(stu.Fullname);
        $('#studentName').text(stu.Fullname);
        $('#studentName').text(stu.Fullname);
        $('#studentName').text(stu.Fullname);
        $('#studentName').text(stu.Fullname);
        $('#studentName').text(stu.Fullname);
        $('#studentName').text(stu.Fullname);
        $('#studentName').text(stu.Fullname);
        $('#studentName').text(stu.Fullname);
        $('#studentName').text(stu.Fullname);
        $('#studentName').text(stu.Fullname);
        $('#studentName').text(stu.Fullname);
        $('#studentName').text(stu.Fullname);
    }
    else {
        stu=doc.data();

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