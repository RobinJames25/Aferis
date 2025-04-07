import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from '../libs/dbConnect.js';

const collection = db.collection('users');

// Signup handler
export const signup = async (req, res, next) => {
  try {
    const { username, email, password, role } = req.body; // Accept role from the request body

    // Check if the email or username already exists
    const query = { $or: [{ email }, { username }] };
    const existingUser = await collection.findOne(query);

    if (existingUser) {
      return next({
        status: 422,
        message: 'Email or Username is already registered.',
      });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Assign role (defaults to 'user' if no role is provided)
    const userRole = role || 'user';  // Default role is 'user' if not specified

    const user = {
      username,
      email,
      password: hashedPassword,
      avatar: 'https://g.codewithnathan.com/default-user.png',
      role: userRole, // Save the role in the database
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Insert the user into the database
    const { insertedId } = await collection.insertOne(user);

    // Generate a JWT token with the inserted user's ID
    const token = jwt.sign({ id: insertedId }, process.env.AUTH_SECRET, { expiresIn: '1h' });

    // Remove sensitive data like password before sending the response
    user._id = insertedId;
    const { password: pass, updatedAt, createdAt, ...rest } = user;

    // Return the token and user data (without password)
    res.status(200).json({
      message: 'Signup successful',
      token: token,  // Bearer token in response body
      user: rest,
    });
  } catch (error) {
    next({ status: 500, error });
  }
};

// Signin handler
export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const validUser = await collection.findOne({ email });
    if (!validUser) {
      return next({ status: 404, message: 'User not found!' });
    }

    // Compare the provided password with the hashed password in the DB
    const validPassword = await bcrypt.compare(password, validUser.password);
    if (!validPassword) {
      return next({ status: 401, message: 'Wrong password!' });
    }

    // Generate a JWT token with the user's ID
    const token = jwt.sign({ id: validUser._id }, process.env.AUTH_SECRET, { expiresIn: '1h' });

    // Remove sensitive data like password before sending the response
    const { password: pass, updatedAt, createdAt, ...rest } = validUser;

    // Return the token and user data (without password)
    res.status(200).json({
      message: 'Signin successful',
      token: token,  // Bearer token in response body
      user: rest,
    });
  } catch (error) {
    next({ status: 500, error });
  }
};

// Signout handler (No longer uses cookies)
export const signOut = async (req, res, next) => {
  try {
    // Clear the token (if applicable in frontend, handled there)
    res.status(200).json({ message: 'Sign out successful' });
  } catch (error) {
    next({ status: 500 });
  }
};
