const express = require("express");
const cors = require("cors");

const app=express();

app.use(express.json()) ;

app.use(cors());

//dumy users
let users = [
    {id: 1, name: "john"},
    {id: 2, name: "jack"}
];


app.get("/api/users", (req, res)=>{
    res.json(users);
});

app.post("/api/users", (req, res)=>{
    const newUser = {
        id: users.length+1,
        name: req.body.name
    };
    users.push(newUser);
    res.json({message: "user added", user:newUser})
});
app.listen(5000, () => console.log("server runing on port 5000"));