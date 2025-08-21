/* let users = []; */
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from '../models/user.model.js';



export async function register(req, res) {
    try {
        const { username, password , email} = req.body;
        const existing = await User.findOne({ username });
        if (existing) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        const existingEmail=await User.findOne({ email});
        if(existingEmail){
            return res.status(400).json({message: 'Email already exist'})
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ username, email, password: hashedPassword });
        await user.save();
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }    

    res.status(201).json({ message: 'User registered successfully' });
    
}
 
   
export async function login(req, res) {
    try {
        const { username, password } = req.body;

         // Validate request body
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        // Check if user exists
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare password with hashed password in DB
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Create JWT token
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET, 
            { expiresIn: '1h' });
            const profileCompleted = Boolean(user.category && user.skills && user.category.length > 0 && user.skills.length > 0);

            res.json({ message: 'Login successful',user, token });
  
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: e.message || 'Server error'  });
    }
}


    export async function getAllUsers (req, res) {
        try {
            const users = await User.find().select('-password'); 
            res.status(200).json({ users });
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: 'Server error', error: e.message });
    }
}
    export async function getByUsername (req, res) {
        try {
            const { username } = req.body;
            const users = await User.find({ username }).select('-password'); 
            res.status(200).json({ users });
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: 'Server error', error: e.message });
    }


   
}  

export async function searchUsers (req, res) {
  try {
    const query = req.query.q?.toString() || "";

   
    const users = await User.find({
      $or: [
        { username: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
        { skills: { $elemMatch: { $regex: query, $options: "i" } } }
      ]
    })

    res.json({ users });
  } catch (error){
    ("Search failed:", error); 
    res.status(500).json({ message: "Search failed", error });
  }
};

export async function profile(req, res) {
  const userId = req.params.id;
  const updateData = req.body;

  try {
    const user = await User.findByIdAndUpdate(userId, updateData, { new: true });
    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Update failed' });
  }
}

export async function userProfile(req, res) {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId).select('-password');
    if (!user) {        
      return res.status(404).json({ message: 'User not found' });
    }                                                                           
    res.json({ user });
  } catch (error) {     
    res.status(500).json({ message: 'Server error', error: error.message });
  } 
}
