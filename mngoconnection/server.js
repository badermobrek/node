const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mydb')
.then(()=>{console.log('connected')})
.catch((err)=>{console.error("connection error:", err)});


// git add .

// git commit -m "mngconnect"

// git push origin main