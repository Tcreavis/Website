//Constructor for a student object
function Student(id, first, last, age, degree){
    this.id = id; 
    this.firstName = first;
    this.lastName = last;
    this.age = age;
    this.degree = degree;
}

findStudents();

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

//Variable to hold student object.
var newStudent;

//Select the submit button, and listen for a click.
document.getElementById("submitBut").addEventListener("click", function() {

    //Define each variable with their respective user inputs. This step is just for easier reading.
    studentID = idInput.value;
    studentFirst = firstInput.value;
    studentLast = lastInput.value;
    studentAge = ageInput.value;
    studentDegree = degreeInput.value;

    var anyBlanks = false;

    var studentElements = [studentID, studentFirst, studentLast, studentAge, studentDegree];

    for(var i = 0; i < 4; i++){
        if(!studentElements[i]){
            anyBlanks = true;
        }
    } 

    console.log(anyBlanks);

    if(!anyBlanks){

        //Create a new student object with this information.
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

        studentArr.push(newStudent);

        //Store this newly created object.
        window.localStorage.setItem("student", JSON.stringify(newStudent));

        findStudents();

    }

    else{
        alert("You left something blank!");
    }

})

function findStudents(){

    if(window.localStorage.getItem("student") != null){

        var student = JSON.parse(window.localStorage.getItem('student'));
    
        var list = document.querySelector("ul");
        var entry = document.createElement("li");
        var text = document.createTextNode("Name: " + student.firstName + " " + student.lastName + ", ID: " + student.id + ", Age: " + student.age + ", Major:" + student.degree)
        entry.appendChild(text);
        list.appendChild(entry);

    }
}
