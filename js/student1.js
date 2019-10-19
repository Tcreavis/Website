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

//If there's already an array of student objects in storage, initilize the studentArr with it.
if(window.localStorage.getItem("studentArr")){

    studentArr = JSON.parse(window.localStorage.getItem("studentArr"));

}

//Inspects the student array and adds all student objects to the page.
populateStudents();

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
    for(var i = 0; i < 4; i++){
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

        //Append the new student to the student array.
        studentArr.push(newStudent);

        //Add the new student array to local storage, or overwrite the old one.
        //Local storage requires objects and arrays to be "stringified."
        //We can parse them out when we need to.
        window.localStorage.setItem("studentArr", JSON.stringify(studentArr));

        //Add just the most recent student to the page.
        addNewStudent();
    }

    //Let the user know they left something blank.
    else{
        alert("You left something blank!");
    }

})


function populateStudents(){

    //Check if there is a student array in storage.
    if(window.localStorage.getItem("studentArr")){
        
        //If there is an array of students, pull it from storage, parse the data, and place it in a variable.
        var getStudentArr = JSON.parse(window.localStorage.getItem('studentArr'));
        
        //Go through each object in the array, and use its data to create a new list item.
        for(var i = 0; i < getStudentArr.length; i++){

            var list = document.querySelector("ul");
            var entry = document.createElement("li");

            var delButton = document.createElement("button")
            delButton.className = "delButton";
            delButton.id = getStudentArr[i].id;
            delButton.innerHTML = "Delete"

            var text = document.createTextNode("Name: " + getStudentArr[i].firstName + " " + getStudentArr[i].lastName 
                                                + ", ID: " + getStudentArr[i].id 
                                                + ", Age: " + getStudentArr[i].age 
                                                + ", Major:" + getStudentArr[i].degree + " ")

            text.iD = getStudentArr[i].id;

            entry.appendChild(text);
            entry.appendChild(delButton);
            list.appendChild(entry);

            addDelete();

        }
    }
}

function addNewStudent(){

    //Functions similar to findStudents, but we only want the object at the last index of the array.

    if(window.localStorage.getItem("studentArr")){

        var getStudentArr = JSON.parse(window.localStorage.getItem('studentArr'));
        
        var i = getStudentArr.length-1;

        var list = document.querySelector("ul");
        var entry = document.createElement("li");

        var delButton = document.createElement("button")
        delButton.className = "delButton";
        delButton.id = getStudentArr[i].id;
        delButton.innerHTML = "Delete"

        var text = document.createTextNode("Name: " + getStudentArr[i].firstName + " " + getStudentArr[i].lastName
            + ", ID: " + getStudentArr[i].id
            + ", Age: " + getStudentArr[i].age
            + ", Major:" + getStudentArr[i].degree + " ")

        text.iD = getStudentArr[i].id;

        entry.appendChild(text);
        entry.appendChild(delButton);
        list.appendChild(entry);

        addDelete();
    }

}

function addDelete(){

    var delButtons = document.getElementsByClassName("delButton");

    for(var i = 0; i < delButtons.length; i++){

        delButtons[i].addEventListener("click", function() {
    
            var deleteID = this.id;
            var badStudentInd;
            studentArr = JSON.parse(window.localStorage.getItem("studentArr"));
    
            for( var k = 0; k < studentArr.length; k++){
    
                if(studentArr[k].id == deleteID){
    
                    badStudentInd = k;
    
                }
    
            }
    
            console.log(badStudentInd);

            deleteStudent(badStudentInd);
            
        });
    
    }

}

function deleteStudent(index){

    studentArr = JSON.parse(window.localStorage.getItem("studentArr"));
    studentArr.splice(index, index+1);
    window.localStorage.setItem("studentArr", studentArr);
    //repopulateStudents();

}

function repopulateStudents(){

   var studentList = document.getElementsByTagName("li");

   for(var x = 0; x < studentList.length; x++){

        studentList[x].remove();

   }

   //addOldStudents();


}

