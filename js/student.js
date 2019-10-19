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

        if(window.localStorage.getItem("studentArr")){

            studentArr = JSON.parse(window.localStorage.getItem("studentArr"));
        
        }

        //Append the new student to the student array.
        studentArr.push(newStudent);

        //Add the new student array to local storage, or overwrite the old one.
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

function giveDeleteFunction(){

    var delButtons = document.getElementsByClassName("delButton");

    for(var x = 0; x < delButtons.length; x++){

        delButtons[x].addEventListener("click", function(){
            
            deleteStudent(this.id);

        });
    }
}

function deleteStudent(id){

    var copyStudentArr = JSON.parse(window.localStorage.getItem("studentArr"));

    var deletionID = id;
    var checkThisID;
    var deletionIndex = 99;

    for(var x = 0; x < copyStudentArr.length; x++){

        checkThisID = copyStudentArr[x].id;

        if(deletionID == checkThisID){

            deletionIndex = x;

        }

    }

    copyStudentArr.splice(deletionIndex, deletionIndex+1);

    window.localStorage.setItem("studentArr", JSON.stringify(copyStudentArr));

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
        
        //Go through each object in the array, and use its data to create a new list item.
        for(var i = 0; i < getStudentArr.length; i++){
            
            //Select the students 'ul' and set it to a variable.
            var list = document.querySelector("ul");
            //Create a new 'li' element.
            var entry = document.createElement("li");
            //Giving all 'li' elements a common attribute for bulk modification.
            entry.className = "StudentInfo";

            //Create a delete button for each 'li'
            var delButton = document.createElement("button");
            //Again, giving all buttons a common attribute for possible convenience later.
            delButton.className = "delButton";
            //Giving all buttons a unique ID that mirrors the Student ID with which they are associated.
            delButton.id = getStudentArr[i].id;
            //Give the button a label.
            delButton.innerHTML = "Delete";

            //Create a delete button for each 'li'
            var editButton = document.createElement("button");
            //Again, giving all buttons a common attribute for possible convenience later.
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

            //Append the text and delete button to the 'li'
            entry.appendChild(text);
            entry.appendChild(delButton);
            //Append the 'li' to the 'ul'
            list.appendChild(entry);

        }

        giveDeleteFunction();

    }

}