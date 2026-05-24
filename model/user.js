import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{ type: String },
    email:{type: String, required: true, unique: true},
    username:{type: String, unique: true,required: true},  
    profilePicture:{type: String},
    coverPicture:{type: String},
    createdAt:{type: Date, default: Date.now}

})

const user = mongoose.models.User || mongoose.model("User", userSchema) 

export default user;