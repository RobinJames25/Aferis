import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        username: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        avatar: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
        role: { type: String, enum: ['admin', 'user'], default: 'user' },
    },
    {
        timestamps: true, // This will automatically add createdAt and updatedAt
    }
);

const User = mongoose.model('User', userSchema);

export default User;
