//Constructor for a student object
function Student(id, first, last, age, degree){
    this.id = id; 
    this.firstName = first;
    this.lastName = last;
    this.age = age;
    this.degree = degree;
}

//Variable to hold student objects.
var newStudent;

//Array to hold all student objects.
var studentArr = [];

//Variables to hold each of our input objects
var idInput = document.getElementById("studID");
var firstInput = document.getElementById("firstName");
var lastInput = document.getElementById("lastName");
var ageInput = document.getElementById("age");
var degreeInput = document.getElementById("degree");

//Variables to hold the actual values entered into each input object.
var studentID;
var studentFirst;
var studentLast;
var studentAge;
var studentDegree;

//Get the most recent list of students from storage.
refreshStudents();

//Select the submit button, and listen for a click.
document.getElementById("submitBut").addEventListener("click", function() {

    //Initialize each variable with their respective user inputs.
    studentID = idInput.value;
    studentFirst = firstInput.value;
    studentLast = lastInput.value;
    studentAge = ageInput.value;
    studentDegree = degreeInput.value;

    //A boolean to flag if any input fields were left blank.
    var anyBlanks = false;

    //An array containing the values of each input element. Used only for input validation.
    var studentElements = [studentID, studentFirst, studentLast, studentAge, studentDegree];

    //If any of the values are empty, set the boolean to true.
    for(var i = 0; i < studentElements.length; i++){
        if(!studentElements[i]){
            anyBlanks = true;
        }
    } 

    //As long as we didn't find any blanks, the following code will execute.
    if(!anyBlanks){

        //Create a new student object with the values from the input fields.
        newStudent = new Student(
        studentID, 
        studentFirst, 
        studentLast, 
        studentAge, 
        studentDegree );

        //Clear the user input.
        idInput.value = "";
        firstInput.value = "";
        lastInput.value = "";
        ageInput.value = "";
        degreeInput.value = "";

        //Fetch the current student array in storage.
        if(window.localStorage.getItem("studentArr")){

            studentArr = JSON.parse(window.localStorage.getItem("studentArr"));
        
        }

        //Append the new student to the student array.
        studentArr.push(newStudent);

        //Overwrite the array in storage with the newly appended array.
        //Local storage requires objects and arrays to be "stringified."
        //We can parse them out when we need to.
        window.localStorage.setItem("studentArr", JSON.stringify(studentArr));

        //Add the new student to the page.
        refreshStudents();
    }

    //Let the user know they left something blank.
    else{
        alert("You left something blank!");
    }

})

//Makes our delete buttons clickable and tells the program what to do once they're clicked.
function giveDeleteFunction(){

    //Grab all delete buttons using their common class.
    var delButtons = document.getElementsByClassName("delButton");

    //Iterate through the list of delete buttons and give them click listeners.
    for(var x = 0; x < delButtons.length; x++){

        delButtons[x].addEventListener("click", function(){
            
            //Prompt the user to confirm deletion on click. If confirmed, run the delete function.
            if(window.confirm("Delete Student?")){
                deleteStudent(this.id);
            }
            
        });
    }
}

//Function that actually performs the deletion of desired objects.
function deleteStudent(id){

    //Grab the most recent student array from storage.
    var copyStudentArr = JSON.parse(window.localStorage.getItem("studentArr"));

    //When buttons are created, they are given an element ID that matches
    //the student ID of their respective student object. We can use this
    //commanlity to find the object associated with the delete button that was clicked.

    //The ID we're looking for was passed into the function from the delete button.
    var deletionID = id;
    //We need a variable to hold the ID's of the student objects to look for a match.
    var checkThisID;
    //Once we find a matching ID, we want to note where its object exists in the array.
    var deletionIndex = 99;

    for(var x = 0; x < copyStudentArr.length; x++){

        checkThisID = copyStudentArr[x].id;

        if(deletionID == checkThisID){

            deletionIndex = x;

        }

    }

    //Once we find the index of our desired object, 
    //we can use the array splice function to remove it withou leaving a gap.
    copyStudentArr.splice(deletionIndex, deletionIndex+1);

    //Once the object has been removed, we overwrite the array in storage with the modified array.
    window.localStorage.setItem("studentArr", JSON.stringify(copyStudentArr));

    //Update the page with our new array of students.
    refreshStudents();

}

//Both the editStudent and giveEditFunctions operate similarly to the previus delete functions.
function giveEditFunction(){

    var editButtons = document.getElementsByClassName("editButton");

    for(var x = 0; x < editButtons.length; x++){

        editButtons[x].addEventListener("click", function(){
            
            editStudent(this.id);

        });
    }

}


function editStudent(id){

    var copyStudentArr = JSON.parse(window.localStorage.getItem("studentArr"));

    var editID = id;
    var checkThisID;
    var editIndex = 99;

    for(var x = 0; x < copyStudentArr.length; x++){

        checkThisID = copyStudentArr[x].id;

        if(editID == checkThisID){

            editIndex = x;

        }

    }

    //Grab a copy of the student we want to edit.
    var studentToEdit = copyStudentArr[editIndex];

    //We prompt the user to enter a new value for every data field of a student object.
    //The default input in the prompt is the current value for that field.
    //Each of these user inputs is assigned a variable.
    newID = window.prompt("Enter new ID:" , studentToEdit.id);
    newFirst = window.prompt("Enter new First Name:" , studentToEdit.firstName);
    newLast = window.prompt("Enter new Last Name:" ,  studentToEdit.lastName);
    newAge = window.prompt("Enter new Age:" , studentToEdit.age);
    newDegree = window.prompt("Enter new Degree:" , studentToEdit.degree);

    //We check to see if the user gave any input, and if so, we modify that student's data fields with the user input.
    if(newID != null && newID != ""){
        studentToEdit.id = newID;
    }

    if(newFirst != null && newFirst != ""){
        studentToEdit.firstName = newFirst;
    }

    if(newLast != null && newLast != ""){
        studentToEdit.lastName = newLast;
    }

    if(newAge != null && newAge != ""){
        studentToEdit.age = newAge;
    }

    if(newDegree != null && newDegree != ""){
        studentToEdit.degree = newDegree;
    }

    //We overwrite the desired student with the newly edited student.
    copyStudentArr[editIndex] = studentToEdit;

    //We take the array containined the modifed student and use it to overwrite the student array in storage.
    window.localStorage.setItem("studentArr", JSON.stringify(copyStudentArr));

    //Update the page
    refreshStudents();

}


function refreshStudents(){

    //Erase the current student list.
    if(document.getElementById("studentlist")){

        document.getElementById("studentlist").innerHTML = "";

    }

    //Check if there is a student array in storage.
    if(window.localStorage.getItem("studentArr")){
        
        //If there is an array of students, pull it from storage, parse the data, and place it in a variable.
        var getStudentArr = JSON.parse(window.localStorage.getItem("studentArr"));
        
        //Go through each object in the array, and use its data to create a new list item with buttons.
        for(var i = 0; i < getStudentArr.length; i++){
            
            //Select the students 'ul' and set it to a variable.
            var list = document.getElementById("studentlist");
            //Create a new 'li' element.
            var entry = document.createElement("li");
            //Giving all 'li' elements a common attribute for bulk modification.
            entry.className = "StudentInfo";


            //Create a delete button for each 'li'
            var delButton = document.createElement("button");
            //Again, giving all buttons a common attribute for bulk selection.
            delButton.className = "delButton";
            //Giving all buttons a unique ID that mirrors the Student ID with which they are associated.
            delButton.id = getStudentArr[i].id;
            //Give the button a label.
            delButton.innerHTML = "Delete";


            //Create an edit button for each 'li'
            var editButton = document.createElement("button");
            //Again, giving all buttons a common attribute for bulk selection.
            editButton.className = "editButton";
            //Giving all buttons a unique ID that mirrors the Student ID with which they are associated.
            editButton.id = getStudentArr[i].id;
            //Give the button a label.
            editButton.innerHTML = "Edit";


            //Create a string for each student that lists all of their student info 
            var text = document.createTextNode("Name: " + getStudentArr[i].firstName + " " + getStudentArr[i].lastName 
                                                + ", ID: " + getStudentArr[i].id 
                                                + ", Age: " + getStudentArr[i].age 
                                                + ", Major:" + getStudentArr[i].degree + " ")

            //Give each text node a unique ID as well.
            text.iD = getStudentArr[i].id;

            //Append the text, delete, and edit buttons to the 'li'
            entry.appendChild(text);
            entry.appendChild(delButton);
            entry.appendChild(editButton);
            //Append the 'li' to the 'ul'
            list.appendChild(entry);

        }

        //Give functionality to th buttons.
        giveDeleteFunction();
        giveEditFunction();

    }

}