function generateUI(found, stu) {
    if(found) {
        window.location.href="./searchResult.html";

        $('#studentName').text()=stu.fullName;

        console.log(stu);

    }
    else {
        console.log(stu);
        $('#searchResult').append(`<div class="main-card mb-3 card">
            <div class="card-body"><h5 class="card-title">Dismissable Alerts</h5>
                <div class="alert alert-info alert-dismissible fade show" role="alert">
                    <button type="button" class="close" aria-label="Close"><span aria-hidden="true">×</span></button>
                    No match found
                </div>
            </div>
        </div>`)
    }
}
