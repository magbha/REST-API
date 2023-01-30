const mongoose = require("mongoose");
const {Schema , model} = mongoose;

const UserSchema = new Schema({
    username : String,
    email : String,
    age : Number
})

module.exports = User = model("user" , UserSchema)
