//Classe's code functions identically to Student's
//See Student's code for detailed explanation.

function Class(id, name, seats, degree){
    this.id = id;
    this.name = name;
    this.seats = seats;
    this.degree = degree;
}


var newClass;

var classArr = [];

var idInput = document.getElementById("classID");
var nameInput = document.getElementById("className");
var seatsInput = document.getElementById("seats");
var degreeInput = document.getElementById("degree");

var classID;
var className;
var classSeats;
var classDegree;

refreshClasses();

document.getElementById("submitBut").addEventListener("click", function() {

    classID = idInput.value;
    className = nameInput.value;
    classSeats = seatsInput.value;
    classDegree = degreeInput.value;

    var anyBlanks = false;

    var classElements = [classID, className, classSeats, classDegree];

    for(var i = 0; i < classElements.length; i++){
        if(!classElements[i]){
            anyBlanks = true;
        }
    } 

    if(!anyBlanks){

        newClass = new Class(
            classID, 
            className, 
            classSeats, 
            classDegree, 
        );

        idInput.value = "";
        nameInput.value = "";
        seatsInput.value = "";
        degreeInput.value = "";

        if(window.localStorage.getItem("classArr")){

            classArr = JSON.parse(window.localStorage.getItem("classArr"));
        
        }

        classArr.push(newClass);

        window.localStorage.setItem("classArr", JSON.stringify(classArr));

        refreshClasses();
    }

    else{
        alert("You left something blank!");
    }

})

function giveDeleteFunction(){

    var delButtons = document.getElementsByClassName("delButton");

    for(var x = 0; x < delButtons.length; x++){

        delButtons[x].addEventListener("click", function(){
            
            if(window.confirm("Delete Class?")){
                deleteClass(this.id);
            }
            
        });
    }
}

function deleteClass(id){

    var copyClassArr = JSON.parse(window.localStorage.getItem("classArr"));

    var deletionID = id;
    var checkThisID;
    var deletionIndex = 99;

    for(var x = 0; x < copyClassArr.length; x++){

        checkThisID = copyClassArr[x].id;

        if(deletionID == checkThisID){

            deletionIndex = x;

        }

    }

    copyClassArr.splice(deletionIndex, deletionIndex+1);

    window.localStorage.setItem("classArr", JSON.stringify(copyClassArr));

    refreshClasses();

}

function giveEditFunction(){

    var editButtons = document.getElementsByClassName("editButton");

    for(var x = 0; x < editButtons.length; x++){

        editButtons[x].addEventListener("click", function(){
            
            editClass(this.id);

        });
    }

}

function editClass(id){

    var copyClassArr = JSON.parse(window.localStorage.getItem("classArr"));

    var editID = id;
    var checkThisID;
    var editIndex = 99;

    for(var x = 0; x < copyClassArr.length; x++){

        checkThisID = copyClassArr[x].id;

        if(editID == checkThisID){

            editIndex = x;

        }

    }

    var classToEdit = copyClassArr[editIndex];

    newID = window.prompt("Enter new Class ID:" , classToEdit.id);
    newName = window.prompt("Enter new Class Name:" , classToEdit.name);
    newSeats= window.prompt("Enter new Number of Seats:" , classToEdit.seats);
    newDegree = window.prompt("Enter new Degree:" , classToEdit.degree);

    if(newID != null && newID != ""){
        classToEdit.id = newID;
    }

    if(newName != null && newName != ""){
        classToEdit.name = newName;
    }

    if(newSeats != null && newSeats != ""){
        classToEdit.seats = newSeats;
    }

    if(newDegree != null && newDegree != ""){
        classToEdit.degree = newDegree;
    }

    copyClassArr[editIndex] = classToEdit;

    window.localStorage.setItem("classArr", JSON.stringify(copyClassArr));

    refreshClasses();

}


function refreshClasses(){

    if(document.getElementById("classlist")){

        document.getElementById("classlist").innerHTML = "";

    }

    if(window.localStorage.getItem("classArr")){
        
        var getClassArr = JSON.parse(window.localStorage.getItem("classArr"));
        
        for(var i = 0; i < getClassArr.length; i++){
            
            var list = document.getElementById("classlist");
            var entry = document.createElement("li");
            entry.className = "ClassInfo";


            var delButton = document.createElement("button");
            delButton.className = "delButton";
            delButton.id = getClassArr[i].id;
            delButton.innerHTML = "Delete";

            var editButton = document.createElement("button");
            editButton.className = "editButton";
            editButton.id = getClassArr[i].id;
            editButton.innerHTML = "Edit";

            var text = document.createTextNode("Class Name: " + getClassArr[i].name 
                                                + ", ID: " + getClassArr[i].id 
                                                + ", Seats: " + getClassArr[i].seats
                                                + ", Major:" + getClassArr[i].degree + " ")

            text.iD = getClassArr[i].id;

            entry.appendChild(text);
            entry.appendChild(delButton);
            entry.appendChild(editButton);
            list.appendChild(entry);

        }

        giveDeleteFunction();
        giveEditFunction();

    }

}
