const search=localStorage.getItem('toSearch')
console.log(search);
let student = db.collection('student_personal_details').doc(search);

let found=false;

let getStudent=student.get()
.then(doc => {
    if(!doc.exists) {
        console.log('no doc');
    }
    else {
        stu=doc.data();
        console.log(doc.data());
        $('#fullName').val(stu.Fullname);
        document.getElementById("studentName").value=stu.Fullname;
        console.log(stu.Fullname);
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