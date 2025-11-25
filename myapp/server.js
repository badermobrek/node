
const express = require('express');

const app= express();
//const students =require("./data/student")
const studentRouters = require('./routes/studentRoutes');

app.use(express.json());
app.use('/students',studentRouters);



app.listen(3000);

