const express = require('express');
const app = express();

let students = [
    { id: 1000, name:"Henry Cavill", section: "Acting", gpa: "4.0", nationality: "British"},
    { id: 2000, name:"Mindy Kaling", section: "Writing", gpa: "4.0", nationality:"American"},
    { id: 3000, name:"James Acaster", section: "Comedy", gpa: "4.0", nationality:"British"},
    { id: 4000, name:"Ryan Bergara", section: "Film", gpa: "4.0", nationality:"American"}
];

//GET a list of all the students
app.get ('/students', function(req,res){
    res.send(students);
});

//POST to add a new student
app.post ('/newStudent', function(req,res){
    let newStudent = req.body;
    students.push(newStudent);
    res.send(newStudent);
});







app.listen(4000, function () {
    console.log('server is running on port 4000...');
});