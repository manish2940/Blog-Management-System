import grid from 'gridfs-stream';
import { mongoose } from 'mongoose';

const url = 'http://localhost:8000';


let gfs, gridfsBucket;
const conn = mongoose.connection;
conn.once('open', () => {
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'fs'
    });
    gfs = grid(conn.db, mongoose.mongo);
    gfs.collection('fs');
});



const getImage = async (request, response) => {

    try {   
        console.log("You enetered getImage section");
        const file = await gfs.files.findOne({ filename: request.params.filename });
        console.log(request.params.filename);
        console.log(file.filename);
        
        // const readStream = gfs.createReadStream(file.filename);
        // readStream.pipe(response);
        console.log(file._id);
        const readStream = gridfsBucket.openDownloadStream(file._id);
        readStream.pipe(response);
        
    } catch (error) {
        response.status(500).json({ msg: error.message });
    }
}
export default getImage;