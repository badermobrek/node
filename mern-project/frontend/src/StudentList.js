import { useState, useEffect } from "react";

import axios from "axios";



const API = "http://localhost:5000";



export default function StudentList() {

 const [students, setStudents] = useState([]);

 const [name, setName] = useState("");

 const [age, setAge] = useState("");



 useEffect(() => {

   axios.get(`${API}/students`).then(res => {

     setStudents(res.data);

   });

 }, []);



 const addStudent = () => {

   axios.post(`${API}/students`, { name, age }).then(res => {

     setStudents([...students, res.data]); // update UI instantly

     setName("");

     setAge("");

   });

 };



 return (

   <div>

     <h2>Students</h2>

     {students.map(s => (

       <p key={s._id}>{s.name} - {s.age}</p>

     ))}



     <h3>Add Student</h3>

     <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />

     <input placeholder="Age" value={age} onChange={e => setAge(e.target.value)} />

     <button onClick={addStudent}>Add</button>

   </div>

 );

}