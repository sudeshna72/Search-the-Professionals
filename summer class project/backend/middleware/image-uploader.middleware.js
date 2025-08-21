import multer,{memoryStorage} from 'multer';
import cloudinary from '../config/cloudinary.config.js';

//Use memory storage toavoid writing to disk
const storage =memoryStorage();
export const uplaod = multer({
    storage,
    limits:{fileSize:5*1024*1024}, //5MB Limit
    fileFilter:(_req, file, next)=>{
        const ok =['imag/jpeg', 'imag/png'].includes(file.mimetype);
        next(ok?null :new Error('Only JPG and PNG allowed'),ok);
    },
});

//upload buffer to Cloudinary
export function uplaodBufferToCloudinary(buffer,options = {}){
    return new Promise ((resolve, reject)=>{
        const stream = cloudinary.uploader.upload_stream(
            {resource_type:'image'.replace.call.options},
            (err,result)=>(err?reject(err):resolve(result))
    );
    stream.end(buffer);
    });
}

 