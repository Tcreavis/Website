//Much code here is simnilar to that found in the students and classes js files.
//A thorough explanation of all code is available in the students js file.
//Comments here are only noting unique elements of the Enrollment page.

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

//Variables to hold the actual values selected from each input list.
var newEnrollmentID;
var newStudentID;
var newClassID;

//Update the page with the most recent list of enrollments.
refreshEnrollments();

//Watching for clicks on the submit button.
document.getElementById("submitBut").addEventListener("click", function() {

    //Initialize each variable with their respective user inputs.
    newStudentID = studentIDList.options[studentIDList.selectedIndex].text;
    newClassID = classIDList.options[classIDList.selectedIndex].text;
    //Enrollment ID's are made of a combination of the student and class ID's
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

        //Create a new Enrollment object with the values from the input fields.
        newEnrollment = new Enrollment(
            newEnrollmentID,
            newStudentID,
            newClassID
        );

        //Clear the user input.
        studentIDList.selectedIndex = 0;
        classIDList.selectedIndex = 0;

        //Grab the current enrollment array from storage.
        if(window.localStorage.getItem("enrollmentArr")){

            enrollmentArr = JSON.parse(window.localStorage.getItem("enrollmentArr"));
    
        }

        //Append the new enrollment to the enrollments array.
        enrollmentArr.push(newEnrollment);

        //Overwrite the array in storage with the newly modifed array.
        window.localStorage.setItem("enrollmentArr", JSON.stringify(enrollmentArr));

        //Add the new enrollmet to the page.
        refreshEnrollments();
    }

    //Let the user know they left something blank.
    else{
        alert("You left something blank!");
    }

})

//Giving the delete buttons functionality.
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

//When a button is clicked, delete its associate item.
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

//Give edit buttons their functionality.
function giveEditFunction(){

    var editButtons = document.getElementsByClassName("editButton");

    for(var x = 0; x < editButtons.length; x++){

        editButtons[x].addEventListener("click", function(){
            
            editEnrollment(this.id);

        });
    }

}

//Prompt the user for new information when an edit buttons is clicked.
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

//Update the page with the current enrollment objects in the stored array.
function refreshEnrollments(){

    if(document.getElementById("enrollmentlist")){

        document.getElementById("enrollmentlist").innerHTML = "";

    }

    if(window.localStorage.getItem("enrollmentArr")){
        
        var getEnrollmentArr = JSON.parse(window.localStorage.getItem("enrollmentArr"));
        
        for(var i = 0; i < getEnrollmentArr.length; i++){
            
            var list = document.getElementById("enrollmentlist");
            var entry = document.createElement("li");
            entry.className = "EnrollmentInfo";

            var delButton = document.createElement("button");
            delButton.className = "delButton";
            delButton.id = getEnrollmentArr[i].enrollmentID;
            delButton.innerHTML = "Delete";

            var editButton = document.createElement("button");
            editButton.className = "editButton";
            editButton.id = getEnrollmentArr[i].enrollmentID;
            editButton.innerHTML = "Edit";

            var text = document.createTextNode("Student: " + getEnrollmentArr[i].studentID 
                                                + " Is Enrolled In Class : " + getEnrollmentArr[i].classID
                                                + " [Enrollment ID: " + getEnrollmentArr[i].enrollmentID + "]" )

            text.iD = getEnrollmentArr[i].enrollmentID;

            entry.appendChild(text);
            entry.appendChild(delButton);
            entry.appendChild(editButton);
            list.appendChild(entry);

        }

        giveDeleteFunction();
        giveEditFunction();

    }

}
