import mongoose from "mongoose";
const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        unique:true   

    },

})
const user = mongoose.model('user',userSchema);
export default user;