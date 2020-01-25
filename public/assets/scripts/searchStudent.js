
var filter=[]
function OnChangeCheckbox (checkbox) {
    if (checkbox.checked) {
        if(filter.indexOf(checkbox.value)==-1){
        filter.push(checkbox.value);
        //alert (checkbox.value);
        console.log(filter)
       // $("Stringfilter").text(filter.toString())
       document.getElementById("Stringfilter").innerHTML = filter.toString();
        }
    }
    else {
        var a = filter.indexOf(checkbox.value);
        if(a!=-1){
        filter.splice(a,1);
        //alert ("The check box is not checked.");
        console.log(filter)
        document.getElementById("Stringfilter").innerHTML = filter.toString();
        }
    }
}

function OnChangeRadio(radio) {
    var a=$("input[name='higherStudies']:checked").val();
    console.log(a)
    if(document.getElementById('higherStudies').checked) { 
        var a=$("input[name='higherStudies']:checked").val();
        filter.push(a);
    } 
}

function OnSearch(){
    if ($("input[name='higherStudies']:checked").length > 0) {
        var higherstudies=$("input[name='higherStudies']:checked").val();
        filter.push(higherstudies);
    }
    var inputcgpa=document.getElementById("searchStudentCGPA").value;
    if(inputcgpa!=""){
        inputcgpa="CGPA:"+inputcgpa
        filter.push(inputcgpa);
    }
    document.getElementById("Stringfilter").innerHTML = filter.toString();
    console.log(filter)
}


// after sending the data to fetch after search button clear the array:filter
//filter.splice(0,filter.length)