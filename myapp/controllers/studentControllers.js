const students = require('../data/student');

exports.getAllStudents= (req, res ) =>
{
    res.json(students);
};

exports.addStudent= (req, res)=>
{
    const newstudent= {
        id: students.length+1, 
        name: req.body.name,
        age: req.body.age
    }
    students.push(newstudent)
    res.status(201).json(newstudent)

};
exports.updateStudent = (req, res)=>{
    const stu = students.find(s =>s.id === parseInt(req.params.id));
    if (!stu) return res.status(404).send("student not found");

    stu.name= req.body.name || stu.name;
    stu.age= req.body.age || stu.age;

    res.json(stu);

};
exports.deleteStudent =  (req, res) => {
    const studentIndex = students.findIndex(s => s.id === parseInt(req.params.id));

    if (studentIndex === -1) return res.status (404).send("student not found");
    const deletestudent = students.splice(studentIndex, 1);
    res.json(deletestudent[0]);
};