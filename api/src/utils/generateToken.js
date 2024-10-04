import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '30d', // Token expiry set to 30 days
    });

    // Set the token as a cookie in the response
    res.cookie('jwt', token, {
        httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
        secure: process.env.NODE_ENV !== 'development', // Set 'secure' for production (HTTPS)
        sameSite: 'strict', // Prevents CSRF (Cross-Site Request Forgery)
        maxAge: 30 * 24 * 60 * 60 * 1000, // Correct maxAge for 30 days in milliseconds
    });
};

export default generateToken;
