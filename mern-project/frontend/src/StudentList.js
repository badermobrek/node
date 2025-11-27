// import { useState, useEffect } from "react";

// import axios from "axios";



// const API = process.env.REACT_APP_API_URL;



// export default function StudentList() {

//  const [students, setStudents] = useState([]);

//  const [name, setName] = useState("");

//  const [age, setAge] = useState("");



//  useEffect(() => {

//    axios.get(`${API}/students`).then(res => {

//      setStudents(res.data);

//    });

//  }, []);



//  const addStudent = () => {

//    axios.post(`${API}/students`, { name, age }).then(res => {

//      setStudents([...students, res.data]); // update UI instantly

//      setName("");

//      setAge("");

//    });

//  };



//  return (

//    <div>

//      <h2>Students</h2>

//      {students.map(s => (

//        <p key={s._id}>{s.name} - {s.age}</p>

//      ))}



//      <h3>Add Student</h3>

//      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />

//      <input placeholder="Age" value={age} onChange={e => setAge(e.target.value)} />

//      <button onClick={addStudent}>Add</button>

//    </div>

//  );

// }

import { useState, useEffect } from "react";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;
console.log(process.env.REACT_APP_API_URL);
console.log("check")
export default function StudentList() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null);     // Error state

  // Fetch students on initial load
  useEffect(() => {
    axios
      .get(`${API}/students`)
      .then((res) => {
        if (Array.isArray(res.data)) {
          setStudents(res.data);
        } else {
          console.error("API response is not an array:", res.data);
          setStudents([]); // Default to empty array in case of unexpected response
        }
        setLoading(false);  // Turn off loading once data is fetched
      })
      .catch((err) => {
        console.error("Error fetching students:", err);
        setError("Failed to load students.");  // Set error message if API fails
        setLoading(false);  // Turn off loading even in case of an error
      });
  }, []);

  const addStudent = () => {
    // Check if name and age are valid
    if (!name || !age) {
      alert("Please provide both name and age.");
      return;
    }

    axios
      .post(`${API}/students`, { name, age })
      .then((res) => {
        setStudents([...students, res.data]); // Update UI instantly
        setName("");
        setAge("");
      })
      .catch((err) => {
        console.error("Error adding student:", err);
      });
  };

  // Display loading or error state
  if (loading) {
    return <p>Loading students...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Students</h2>
      {students.length > 0 ? (
        students.map((s) => (
          <p key={s._id}>
            {s.name} - {s.age}
          </p>
        ))
      ) : (
        <p>No students found.</p>
      )}

      <h3>Add Student</h3>
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <button onClick={addStudent}>Add</button>
    </div>
  );
}
