const express= require("express");

const mongoose= require("mongoose");
const Student = require('./models/student'); 

const app= express(); // app to start express
app.use(express.json()); //to convert incoming requste to json

//connect mngodb
mongoose.connect('mongodb://localhost:27017/school')
.then(()=>{console.log('connected')})
.catch((err)=>{console.error("connection error:", err)});

app.post('/students', async (req , res) =>{
    try{
        const student = new Student(req.body); //req.body meaning collect the data from frontend
        const result = await student.save();
        res.status(201).json(result);
    } catch(err) {
        res.status(400).json({error: err.message});
    }
})

//read: all the data from database
app.get('/students', async (req, res)=>{
    
    try {
        const s = await Student.find();
 
        res.json(s);
    } catch(err) {
        res.status(400).json({error: err.message});
    }
})

 app.get('/students/:id', async (req, res) =>{
    
    try {
       
        const s = await Student.findById(req.params.id);
        console.log(s);
        if(!s) return res.status(404).send ("student not found ");
        res.json(s);
    }catch(err) {
        res.status(400).json({error: err.message});
    }
})
//update student
app.put('/students/:id', async (req, res) =>{
    try {
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true, runValidators: true}
        );
        if (!student) return res.status(404).send("student not found");
        res.json(student);
    }catch(err) {
        res.status(400).json({error: err.message});
    }
})
//delete by id
app.delete('/students/:id', async (req, res) =>{
    try {
        const student = await Student.findByIdAndDelete(
            req.params.id,
            req.body,
            {new: true, runValidators: true}
        );
        if (!student) return res.status(404).send("student not found");
        res.json(student);
    }catch(err) {
        res.status(400).json({error: err.message});
    }
})
app.listen(3000);

