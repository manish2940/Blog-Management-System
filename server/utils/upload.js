import {GridFsStorage} from 'multer-gridfs-storage';
import dotenv from 'dotenv';
import multer from 'multer';
dotenv.config();
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const storage = new GridFsStorage({
    url:`mongodb://${username}:${password}@ac-ermve0e-shard-00-00.rw36d1m.mongodb.net:27017,ac-ermve0e-shard-00-01.rw36d1m.mongodb.net:27017,ac-ermve0e-shard-00-02.rw36d1m.mongodb.net:27017/?ssl=true&replicaSet=atlas-hsv7cg-shard-0&authSource=admin&retryWrites=true&w=majority&appName=BlogManagementdb`,
    options:{
        useNewUrlParser:true
    },
    file:(request,file)=>{
        console.log("you made it bro");
        const match = ["image/png","image/jpg"];
        if(match.indexOf(file.mimetype)=== -1){
            return `${Date.now()}-blog-${file.originalname}`;

        }
        console.log("you enetered the code of file");
        console.log(file.originalname);

        
        return {
            bucketName:"photos",
            filename: `${Date.now()}-blog-${file.originalname}`
        }
    }
});
const upload = multer({storage});
export default upload;

