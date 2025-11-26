const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mydb')
.then(()=>{console.log('connected')})
.catch((err)=>{console.error("connection error:", err)});


// git add .

// git commit -m "mngconnect"

// git push origin main

//Degine a Schema

const userSchema = new mongoose.Schema({
    name: {type: String, required: true },
    email: {type: String, required: true, unique: true},
    age: {type: Number, min: 0}
    
});


//create a model 

const User = mongoose.model('User', userSchema);

//Async function for Crud will run one after one
async function runCRUD(){
    try {
         const newUser = new User({ name: "john", email: "bader19@gmail", age: 22});
         await newUser.save(); //await meaning wait for the previos to complete
         console.log("user added");
// find user and display
     const users = await User.find ({ age: { $gte: 18}});
     console.log("Users:", users);

    //ubdate user 
    const users1 = await User.updateOne({email:"bader12@gmail"}, {$set: {name: "ahmed", age: 30}}); //$set use to ubdate the new to the colm
    console.log("user updated",users1);

     await User.deleteOne({email: "bader@gmail"});
     console.log("email deleted");

    }
    catch(err){
        console.error(err);
    } finally {
        mongoose.connection.close();
    }
}

runCRUD(); //i need to call the function to run it



