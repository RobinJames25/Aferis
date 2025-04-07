import jwt from 'jsonwebtoken';
import { db } from '../libs/dbConnect.js';
import { ObjectId } from 'mongodb';

// Middleware to check if the user is logged in
export const verifyToken = async (req, res, next) => {
    try {
        // Extract the token from the 'Authorization' header (Bearer token)
        const token = req.headers['authorization']?.split(' ')[1];  // Get token after "Bearer"

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized: No token found' });
        }

        // Verify the token with the AUTH_SECRET from the .env file
        const decoded = jwt.verify(token, process.env.AUTH_SECRET);

        // Access the 'users' collection from the db instance
        const usersCollection = db.collection('users');  // Now you have the 'users' collection reference

        // Find the user in the database using the decoded ID
        const user = await usersCollection.findOne({ _id: new ObjectId(decoded.id) });

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized: User not found' });
        }

        // Attach the user information to the request object for further use
        req.user = {
            _id: user._id,
            username: user.username,
            email: user.email,
            avatar: user.avatar,
            role: user.role,  // Assuming 'role' is present on the user document
        };

        next();  // Proceed to the next middleware or route handler
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token', error: err.message });
    }
};
// Middleware to check if the user is an admin
export const isAdmin = (req, res, next) => {
    // Check if the user is an admin
    if (req.user?.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied: Admins only' });
    }
    next(); // Proceed to the route or next middleware
};

// Global Error Handler Middleware
export const errorHandler = (err, req, res, next) => {
    const defaultMessage = "We're having technical issues. Please try again later";
    const { status = 500, message, error } = err;

    // Log the error if available
    if (error) {
        console.error(error);
    }

    // Return the error response with status code
    res.status(status).json({ message: message || defaultMessage });
};
