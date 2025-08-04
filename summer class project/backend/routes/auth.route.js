import {Router} from "express";

const router = Router();
import {register} from '../controllers/auth.controller.js';
import {login} from '../controllers/auth.controller.js'; 
import {getAllUsers,getByUsername,searchUsers,userProfile } from '../controllers/auth.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';



router.post('/register', register);
router.post('/login', login);
router.post('/userProfile',authMiddleware, userProfile);
router.get('/getAllUsers',authMiddleware,getAllUsers);
router.get('/getByUsername',authMiddleware,getByUsername);
router.get('/searchUsers',authMiddleware,searchUsers);

 

export default router;