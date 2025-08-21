import {Router} from "express";

const router = Router();
import {register} from '../controllers/auth.controller.js';
import {login} from '../controllers/auth.controller.js'; 
import {getAllUsers,getByUsername,searchUsers,userProfile } from '../controllers/auth.controller.js';
import {profile} from '../controllers/auth.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

/* import {upload} from '../middleware/image-uploader.middleware.js';
import { uploadProfilePicture } from '../controllers/profilepicture.controller.js'; */


router.post('/register', register);
router.post('/login', login);
router.post('/userProfile',authMiddleware, userProfile);
router.get('/getAllUsers',authMiddleware,getAllUsers);
router.get('/getByUsername',authMiddleware,getByUsername);
router.get('/searchUsers',authMiddleware,searchUsers);
router.get('/profile/:id',authMiddleware,profile);
router.put('/profile/:id',authMiddleware,profile);



/* router.patch('/update,checkToken,updateUser'); 
router.patch('/uploadProfilePic', checkToken,uploadProfilePic.single('image'),uploadProfilePic);
router.delete("/deleteProfilePic",checkToken,deleteProfilePic) ;  */


export default router;