const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

require("dotenv").config();



const studentRoutes = require("./routes/studentRoutes");



const app = express();

app.use(cors());

app.use(express.json());



app.use("/students", studentRoutes);



mongoose.connect(process.env.MONGO_URL)

 .then(() => console.log("MongoDB Connected"))

 .catch(err => console.log(err));



app.get("/", (req, res) => {

 res.send("Backend is running...");

});



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("Server running on", PORT));