import { useEffect, useState } from "react";
import axios from "axios";

function App(){
  const [users, setUsers]= useState([]); //maintan the state of data vairble
  const [name, setname]= useState("");
   const loadUsers= () =>{
 axios.get("http://localhost:5000/api/users")
  .then((res) => {
    setUsers(res.data);
  })
  .catch((err) => console.error(err));

  }
  useEffect(()=>{
    //fetch("http://localhost:5000/api/test")
    //.then (res => res.json())
    //.then(result => setData(result.message)); // message is key from nackend 
  //},[]); // [] to load it first when ever the page load
 loadUsers();
 
},[]);

 //post user 
 const addUser = async ()=>{
  await axios.post("http://localhost:5000/api/users", {name}); //request goaing to backend
  setname(""); //clear input
  loadUsers();
 }
  return (
    <div>
      <h1>User List</h1>
      {users.map(u =>(
        <p key={u.id}>{u.name}</p> 
      ))}
      <input type="text" value={name} onChange={(e)=>setname(e.target.value)}
      placeholder="Enter Your Name" />
      <button onClick={addUser}>Add User</button>
    </div>
  )
}
export default App;