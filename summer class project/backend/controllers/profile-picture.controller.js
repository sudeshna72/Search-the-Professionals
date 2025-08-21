import User from '../models/user.model.js';
import { uploadBufferToCloudinary } from '../middleware/image-uploader.middleware.js';
import cloudinary from '../config/cloudinary.config.js';

export const uploadPrifilePicture = async (req, res) => {
    try{
        if (!req.file) throw new Error('No file uploaded');
        const result = await uploadBufferToCloudinary(req.file.buffer, {
            folder: 'profile_pictures',
            public_id: `profile_${req.user._id}`,
            transformation:[
                { width: 1600, height: 1600, crop: 'fill', gravity:'auto' },
                {quality: 'auto', fetch_format: 'auto'},
            ]
        });

        const user = await User.findByIdAndUpdate(
            req.user._id,
            {
                profilePicture: {
                    url: result.secure_url,
                    public_id: result.public_id
                }
            },
            { new: true }
        );
        res.json({
            sucess: true, image:user.profilePicture
        });

    } catch(e){
        res.status(400).json({
            sucess: false,
            message: e.message 
        });
    }
}