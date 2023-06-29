const express = require('express');
const app = express();

//middleware 
app.use(express.urlencoded({extended:false}));

let getCount = 0;

let putCount = 0;

let pathCount = 0;

let deleteCount = 0;

function localMiddleware(req, res, next){
    count +=1;
    console.log(req.method);

    console.log(count);

    next();
};


let students = [
    { id: 1000, name:"Henry Cavill", section: "Acting", gpa: "4.0", nationality: "British"},
    { id: 2000, name:"Mindy Kaling", section: "Writing", gpa: "3.0", nationality:"American"},
    { id: 3000, name:"James Acaster", section: "Comedy", gpa: "2.5", nationality:"British"},
    { id: 4000, name:"Ryan Bergara", section: "Film", gpa: "2.00", nationality:"American"}
];

//GET a list of all the students
app.get ('/students', function(req,res){
    res.send(students);
});

//GET to grab/filter specific students based on specific information provided 
app.get('/filter',function(req,res){
    
    
    if(req.query.section !== undefined){
        let sect = req.query.section;
    
        let result = students.filter((item)=>{
            return item.section === sect; 
        });
        res.send(result);
    }

    if(req.query.id !== undefined){
        let id = req.query.id;

        let result = students.filter((item)=> {
            return item.id === id;
        });
        res.send(result);
    }
});

//POST to add a new student
app.post ('/newStudents', function(req,res){
    let newStudent = req.body;
    students.push(newStudent);
    res.send(newStudent);
});

//PUT to Fully Update a student
app.put('/students/:students_id', function(req,res){
    let studentsId = parseInt(req.params.students_id);

    let index = students.findIndex((s)=>{
        return s.id === studentsId;
    });

    let newStudentsData = req.body;
    students[index] = newStudentsData;

    res.send(newStudentsData);
});

//DELETE to delete a student
app.delete('/students/:students_id', function(req, res){
    let studentsId = parseInt(req.params.students_id);

    let index = students.findIndex((s) => {
        return s.id === studentsId;
    });
    students.splice(index, 1);

    res.send('Success');
});






//Server
app.listen(4000, function () {
    console.log('server is running on port 4000...');
});