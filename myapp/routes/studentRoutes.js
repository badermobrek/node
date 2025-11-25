const express = require('express');
const router = express.Router();
const studentControllers= require ('../controllers/studentControllers');
router.get('/get',studentControllers.getAllStudents);
router.post('/', studentControllers.addStudent);
router.put('/:id', studentControllers.updateStudent);
router.delete('/:id', studentControllers.deleteStudent);

module.exports = router;
