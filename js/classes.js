function Class(id, name, seats, degree){
    this.id = id;
    this.name = name;
    this.seats = seats;
    this.degree = degree;
}

//Variable to hold student objects.
var newClass;

//Array to hold all student objects.
var classArr = [];

//Variables to hold each of our input objects
var idInput = document.getElementById("classID");
var nameInput = document.getElementById("className");
var seatsInput = document.getElementById("seats");
var degreeInput = document.getElementById("degree");

//Variables to hold the actual values entered into each input object.
var classID;
var className;
var classSeats;
var classDegree;

//Get the most recent list of students from storage.
refreshClasses();

//Select the submit button, and listen for a click.
document.getElementById("submitBut").addEventListener("click", function() {

    //Initialize each variable with their respective user inputs.
    classID = idInput.value;
    className = nameInput.value;
    classSeats = seatsInput.value;
    classDegree = degreeInput.value;

    //A boolean to flag if any input fields were left blank.
    var anyBlanks = false;

    //An array containing the values of each input element. Used only for input validation.
    var classElements = [classID, className, classSeats, classDegree];

    //If any of the values are empty, set the boolean to true.
    for(var i = 0; i < classElements.length; i++){
        if(!classElements[i]){
            anyBlanks = true;
        }
    } 

    //As long as we didn't find any blanks, the following code will execute.
    if(!anyBlanks){

        //Create a new student object with the values from the input fields.
        newClass = new Class(
            classID, 
            className, 
            classSeats, 
            classDegree, 
        );

        //Clear the user input.
        idInput.value = "";
        nameInput.value = "";
        seatsInput.value = "";
        degreeInput.value = "";

        if(window.localStorage.getItem("classArr")){

            classArr = JSON.parse(window.localStorage.getItem("classArr"));
        
        }

        //Append the new student to the student array.
        classArr.push(newClass);

        //Add the new student array to local storage, or overwrite the old one.
        //Local storage requires objects and arrays to be "stringified."
        //We can parse them out when we need to.
        window.localStorage.setItem("classArr", JSON.stringify(classArr));

        //Add the new student to the page.
        refreshClasses();
    }

    //Let the user know they left something blank.
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

    if(newID != null){
        classToEdit.id = newID;
    }

    if(newName != null){
        classToEdit.name = newName;
    }

    if(newSeats != null){
        classToEdit.seats = newSeats;
    }

    if(newDegree != null){
        classToEdit.degree = newDegree;
    }

    copyClassArr[editIndex] = classToEdit;

    window.localStorage.setItem("classArr", JSON.stringify(copyClassArr));

    refreshClasses();

}


function refreshClasses(){

    //Erase the current student list.
    if(document.getElementById("classlist")){

        document.getElementById("classlist").innerHTML = "";

    }

    //Check if there is a student array in storage.
    if(window.localStorage.getItem("classArr")){
        
        //If there is an array of students, pull it from storage, parse the data, and place it in a variable.
        var getClassArr = JSON.parse(window.localStorage.getItem("classArr"));
        
        //Go through each object in the array, and use its data to create a new list item with buttons.
        for(var i = 0; i < getClassArr.length; i++){
            
            //Select the students 'ul' and set it to a variable.
            var list = document.getElementById("classList");
            //Create a new 'li' element.
            var entry = document.createElement("li");
            //Giving all 'li' elements a common attribute for bulk modification.
            entry.className = "ClassInfo";


            //Create a delete button for each 'li'
            var delButton = document.createElement("button");
            //Again, giving all buttons a common attribute for possible convenience later.
            delButton.className = "delButton";
            //Giving all buttons a unique ID that mirrors the Student ID with which they are associated.
            delButton.id = getClassArr[i].id;
            //Give the button a label.
            delButton.innerHTML = "Delete";


            //Create an edit button for each 'li'
            var editButton = document.createElement("button");
            //Again, giving all buttons a common attribute for possible convenience later.
            editButton.className = "editButton";
            //Giving all buttons a unique ID that mirrors the Student ID with which they are associated.
            editButton.id = getClassArr[i].id;
            //Give the button a label.
            editButton.innerHTML = "Edit";


            //Create a string for each student that lists all of their student info 
            var text = document.createTextNode("Class Name: " + getClassArr[i].name 
                                                + ", ID: " + getClassArr[i].id 
                                                + ", Seats: " + getClassArr[i].seats
                                                + ", Major:" + getClassArr[i].degree + " ")

            //Give each text node a unique ID as well.
            text.iD = getClassArr[i].id;

            //Append the text, delete, and edit buttons to the 'li'
            entry.appendChild(text);
            entry.appendChild(delButton);
            entry.appendChild(editButton);
            //Append the 'li' to the 'ul'
            list.appendChild(entry);

        }

        giveDeleteFunction();
        giveEditFunction();

    }

}
