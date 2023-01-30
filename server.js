require('dotenv').config({path : './config/.env'});
const mongoose = require("mongoose");
const express = require("express");
const User = require('./models/User');
const app = express();
app.use(express.json());

//Linking Server to Database
const linkDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("Database is Linked... ");
  } catch (error) {
    console.log("...Database Cant Be Linked!");
  }
};
linkDB();

//get All users
app.get("/all-users" , async(req , res) => {
    try {
        const listOfContacts = await User.find()
        res.status(200).send({msg : "User List" , listOfContacts})
    } catch (error) {
        res.status(400).send({msg : "Cant get List" , error})
    }
})


//add new User
app.post("/add" , async(req , res) => {
    try {
        const {username , email , age} = req.body 
        const newUser = new User ({username , email , age })
        await newUser.save()
        res.status(200).send({msg : "user Object Has been Added" , newUser})
    } catch (error) {
        res.status(400).send({msg : `cannot be added ${error.message} ` , })
    }
})

//Edit user By Id
app.put("/:_id" , async(req , res) => {
    try {
        const {_id} = req.params;
        const resault = await User.findByIdAndUpdate({_id} , {$set : {...req.body}})
        res.status(200).send({msg : "User Updated!" })
    } catch (error) {
        res.status(400).send({msg : "Cannot Update" , error})
    }
})

//Delete User By ID
app.delete("/:_id" ,async(req , res) => {
    try {
        const {_id} = req.params;
        await User.findOneAndDelete({_id})
        res.status(200).send({msg : "User Deleted"})
    } catch (error) {
        res.status(400).send({msg : "Cannot Delete User" , error})
    }
})


//Startin server 
app.listen(process.env.PORT , error => {
    error ? console.log(`Cant Run Server : ${error.message}`) : 
    console.log(`Server Is Runnig on PORT ${process.env.PORT}`)
})