//Constructor for enrollment objects
function Enrollment(enrollmentID, studentID, classID){
    this.enrollmentID = enrollmentID;
    this.studentID = studentID;
    this.classID = classID;
}

//Pull student and class data from storage
var students = JSON.parse(window.localStorage.getItem("studentArr"));
var classes = JSON.parse(window.localStorage.getItem("classArr"));

//Generate list options for students
var defaultStudentSelection = document.createElement("option");
defaultStudentSelection.setAttribute("selected", "selected");
defaultStudentSelection.setAttribute("class", "studentselection");
defaultStudentSelection.innerHTML = "None";
document.getElementById("students").appendChild(defaultStudentSelection);

for(var x = 0; x < students.length; x++){
    var studentOptionTag = document.createElement("option")
    studentOptionTag.innerHTML = students[x].id;
    studentOptionTag.setAttribute("class", "studentselection");
    document.getElementById("students").appendChild(studentOptionTag);
}

//Generate list options for classes
var defaultClassSelection = document.createElement("option");
defaultClassSelection.setAttribute("selected", "selected");
defaultClassSelection.setAttribute("class", "classSelection");
defaultClassSelection.innerHTML = "None";
document.getElementById("classes").appendChild(defaultClassSelection);

for(var x = 0; x < classes.length; x++){
    var classOptionTag = document.createElement("option")
    classOptionTag.innerHTML = classes[x].id;
    classOptionTag.setAttribute("class", "classSelection");
    document.getElementById("classes").appendChild(classOptionTag)
}

//////////////// CREATING AND MODIFYING ENROLLMENT OBJECTS /////////////////////////

//Variable to hold enrollment objects.
var newEnrollment;

//Array to hold all enrollment objects.
var enrollmentArr = [];

//Variables to hold each of our input lists
var studentIDList = document.getElementById("students");
var classIDList = document.getElementById("classes");

//Variables to hold the actual values selected from each input object.
var newEnrollmentID;
var newStudentID;
var newClassID;

refreshEnrollments();

document.getElementById("submitBut").addEventListener("click", function() {

    if(window.localStorage.getItem("enrollmentArr")){

        enrollmentArr = JSON.parse(window.localStorage.getItem("enrollmentArr"));

    }

    //Initialize each variable with their respective user inputs.
    newStudentID = studentIDList.options[studentIDList.selectedIndex].text;
    newClassID = classIDList.options[classIDList.selectedIndex].text;
    newEnrollmentID = newStudentID + "//" + newClassID

    //A boolean to flag if any input fields were left blank.
    var anyBlanks = false;

    //An array containing the values of each input element. Used only for input validation.
    var enrollmentElements = [newEnrollmentID, newStudentID, newClassID];

    //If any of the values are empty, set the boolean to true.
    for(var i = 0; i < enrollmentElements.length; i++){
        if(enrollmentElements[i] == "None"){
            anyBlanks = true;
        }
    } 

    //As long as we didn't find any blanks, the following code will execute.
    if(!anyBlanks){

        //Create a new student object with the values from the input fields.
        newEnrollment = new Enrollment(
            newEnrollmentID,
            newStudentID,
            newClassID
        );

        //Clear the user input.
        studentIDList.selectedIndex = 0;
        classIDList.selectedIndex = 0;

        //Append the new student to the student array.
        enrollmentArr.push(newEnrollment);

        //Add the new student array to local storage, or overwrite the old one.
        //Local storage requires objects and arrays to be "stringified."
        //We can parse them out when we need to.
        window.localStorage.setItem("enrollmentArr", JSON.stringify(enrollmentArr));

        //Add the new student to the page.
        refreshEnrollments();
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
            
            if(window.confirm("Delete Enrollment?")){
                deleteEnrollment(this.id);
            }
            
        });
    }
}

function deleteEnrollment(id){

    var copyEnrollmentArr = JSON.parse(window.localStorage.getItem("enrollmentArr"));

    var deletionID = id;
    var checkThisID;
    var deletionIndex = 99;

    for(var x = 0; x < copyEnrollmentArr.length; x++){

        checkThisID = copyEnrollmentArr[x].enrollmentID;

        if(deletionID == checkThisID){

            deletionIndex = x;

        }

    }

    copyEnrollmentArr.splice(deletionIndex, deletionIndex+1);

    window.localStorage.setItem("enrollmentArr", JSON.stringify(copyEnrollmentArr));

    refreshEnrollments();

}

function giveEditFunction(){

    var editButtons = document.getElementsByClassName("editButton");

    for(var x = 0; x < editButtons.length; x++){

        editButtons[x].addEventListener("click", function(){
            
            editEnrollment(this.id);

        });
    }

}

function editEnrollment(id){

    var copyEnrollmentArr = JSON.parse(window.localStorage.getItem("enrollmentArr"));

    var editID = id;
    var checkThisID;
    var editIndex = 99;

    for(var x = 0; x < copyEnrollmentArr.length; x++){

        checkThisID = copyEnrollmentArr[x].enrollmentID;

        if(editID == checkThisID){

            editIndex = x;

        }

    }

    var enrollmentToEdit = copyEnrollmentArr[editIndex];

    var newStudentID = window.prompt("Enter new Student ID:" , enrollmentToEdit.studentID);
    var newClassID = window.prompt("Enter new Class ID:" ,  enrollmentToEdit.classID);
    var newEnrollmentID = newStudentID + "//" + newClassID;

    if(newStudentID != null && newClassID != null){
        enrollmentToEdit.enrollmentID = newEnrollmentID;
    }

    if(newStudentID != null){
        enrollmentToEdit.studentID = newStudentID;
    }

    if(newClassID != null){
        enrollmentToEdit.classID = newClassID;
    }

    copyEnrollmentArr[editIndex] = enrollmentToEdit;

    window.localStorage.setItem("enrollmentArr", JSON.stringify(copyEnrollmentArr));

    refreshEnrollments();

}

function refreshEnrollments(){

    //Erase the current student list.
    if(document.getElementById("enrollmentlist")){

        document.getElementById("enrollmentlist").innerHTML = "";

    }

    //Check if there is a student array in storage.
    if(window.localStorage.getItem("enrollmentArr")){
        
        //If there is an array of students, pull it from storage, parse the data, and place it in a variable.
        var getEnrollmentArr = JSON.parse(window.localStorage.getItem("enrollmentArr"));
        
        //Go through each object in the array, and use its data to create a new list item with buttons.
        for(var i = 0; i < getEnrollmentArr.length; i++){
            
            //Select the students 'ul' and set it to a variable.
            var list = document.getElementById("enrollmentlist");
            //Create a new 'li' element.
            var entry = document.createElement("li");
            //Giving all 'li' elements a common attribute for bulk modification.
            entry.className = "EnrollmentInfo";


            //Create a delete button for each 'li'
            var delButton = document.createElement("button");
            //Again, giving all buttons a common attribute for possible convenience later.
            delButton.className = "delButton";
            //Giving all buttons a unique ID that mirrors the Student ID with which they are associated.
            delButton.id = getEnrollmentArr[i].enrollmentID;
            //Give the button a label.
            delButton.innerHTML = "Delete";


            //Create an edit button for each 'li'
            var editButton = document.createElement("button");
            //Again, giving all buttons a common attribute for possible convenience later.
            editButton.className = "editButton";
            //Giving all buttons a unique ID that mirrors the Student ID with which they are associated.
            editButton.id = getEnrollmentArr[i].enrollmentID;
            //Give the button a label.
            editButton.innerHTML = "Edit";


            //Create a string for each student that lists all of their student info 
            var text = document.createTextNode("Student: " + getEnrollmentArr[i].studentID 
                                                + " Is Enrolled In Class : " + getEnrollmentArr[i].classID
                                                + " [Enrollment ID: " + getEnrollmentArr[i].enrollmentID + "]" )

            //Give each text node a unique ID as well.
            text.iD = getEnrollmentArr[i].enrollmentID;

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
