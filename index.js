const express= require('express');
const app = express();

app.use(express.urlencoded({ extended: false }));


app.use((req, res, next) => {
    const requestNumber = Date.now();
    console.log(`Request Number: ${requestNumber} - Method: ${req.method}`);
    next();
  });


let students = [
    { id: 1, name: "John Wick", section: "Computer Science", gpa: "3.0", nationality: "Tawainese"},
    { id: 2, name: "Jennifer Lopez", section: "Music", gpa: "4.0", nationality: "Cree" },
    { id: 3, name: "Victoria Benneth", section: "History", gpa: "3.5", nationality: "American" },
    { id: 4, name: "Peter Pan", section: "History", gpa: "2.9", nationality: "Italian" }
];


//Add a Student
app.post('/students', function (req, res) {
    let newStudent = req.body;
    students.push(newStudent);
    res.send(newStudent);
});


//Return all Students
app.get('/students', function (req, res) {
    res.send(students);
});


//Retrieve a student with a specific ID or Section
app.get('/filter', function (req, res) {
    let dept = req.query.department;
    //filter out students that correspond to the specified department.
    let result = students.filter((item) => {
        return item.department === dept;
    });
    res.send(result);
});


//Update a Student
app.put('/students/:student_id', function(req, res){
    let studentId = req.params.student_id;

    //get student array Index
    let index = students.findIndex((s) => {
        return s.id === studentId;
    });

    //update student data
    let newStudentData = req.body;
    students[index] = newStudentData;

    res.send(newStudentData);
});


//Delete a student
app.delete('/students/:student_id', function(req, res){
    //parseInt converts a string value to integer
     let studentId = parseInt(req.params.student_id);
     //Get student array index 
     let index = students.findIndex((s) => {
         return s.id === studentId;
     });
     //Delete student record
     students.splice(index, 1);
 
     res.send("Success");
 
 });


 app.listen(4000,function(){
    console.log('server is running on port 4000...');
 });