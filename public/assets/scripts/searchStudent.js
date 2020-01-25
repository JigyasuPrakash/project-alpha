
var filter=[]
function OnChangeCheckbox (checkbox) {
    if (checkbox.checked) {
        if(filter.indexOf(checkbox.value)==-1){
        filter.push(checkbox.value);
        //alert (checkbox.value);
        console.log(filter)
        }
    }
    else {
        var a = filter.indexOf(checkbox.value);
        if(a!=-1){
        filter.splice(a,1);
        //alert ("The check box is not checked.");
        console.log(filter)
        }
    }
}


/*function OnChangeRadio (radio) {
    var a=$("input[name='higherStudies']:checked").val();
    attribute=a.split(":");
    console.log(attribute)
    console.log(a)
}*/