
import mongoose from "mongoose";


const Connection = async (username,password)=>{
    
    const URL = `mongodb://${username}:${password}@ac-ermve0e-shard-00-00.rw36d1m.mongodb.net:27017,ac-ermve0e-shard-00-01.rw36d1m.mongodb.net:27017,ac-ermve0e-shard-00-02.rw36d1m.mongodb.net:27017/?ssl=true&replicaSet=atlas-hsv7cg-shard-0&authSource=admin&retryWrites=true&w=majority&appName=BlogManagementdb`;
    try{
        await mongoose.connect(URL,{useNewUrlParser:true,useUnifiedTopology:true});
        console.log("database successfully connected");
    }catch(error){
        console.log("Error while connecting the database",error);
    }
}

export default Connection;


