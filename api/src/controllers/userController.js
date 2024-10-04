import asyncHandler from "../middlewares/assyncHandler.js";
import generateToken from "../utils/generateToken.js"; 
import User from "../models/userModel.js"; 


const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ where: { email } });

    // Check if user exists and if password matches the hash
    if (user && (await bcrypt.compare(password, user.password_hash))) {
        generateToken(res, user.id); // Generate JWT token and send it via cookies
        res.json({
            id: user.id,
            username: user.username,
            email: user.email
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});


const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    // Check if the user already exists
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    // Create a new user with hashed password (this is handled in the model hooks)
    const user = await User.create({
        username,
        email,
        password_hash: password, // Password hashing will be handled in the model's beforeCreate hook
    });
    
    if (user) {
        generateToken(res, user.id); // Generate JWT token and send it via cookies
        res.status(201).json({
            id: user.id,
            username: user.username,
            email: user.email
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});


const getUsers = asyncHandler (async (req, res)=>{
    const users = await User.findAll({
        attributes:{exclude:['id','password_hash', 'createdAt','updatedAt']}
    });
    res.json({users})
});

export {registerUser, authUser, getUsers}