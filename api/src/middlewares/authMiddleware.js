import jwt from 'jsonwebtoken'
import asyncHandler from './assyncHandler.js'
import User from '../models/userModel.js'


const protect = asyncHandler(async (req, res, next) => {
    let token = req.cookies.jwt;  // Ensure you are using a cookie parser middleware

    if (token) {
        try {
            // Verify the token and decode it
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Find the user by ID (decoded userId)
            req.user = await User.findByPk(decoded.userId, {
                attributes: { exclude: ['password_hash'] } // Exclude the password hash
            });

            // If the user is not found, throw an error
            if (!req.user) {
                res.status(401);
                throw new Error('Not authorized, user not found');
            }

            // Proceed to the next middleware
            next();
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    } else {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});

export default protect;