const express = require("express");

const Student = require("../models/Student");

const router = express.Router();



// GET all students

router.get("/", async (req, res) => {

 const students = await Student.find();

 res.json(students);

});



// POST add student

router.post("/", async (req, res) => {

 const student = await Student.create(req.body);

 res.json(student);

});



module.exports = router;
