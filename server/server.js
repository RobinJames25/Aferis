import express from 'express';
import 'dotenv/config';
import userRouter from './routes/user.route.js';
import productRouter from './routes/product.route.js';
import authRouter from './routes/auth.route.js';
import { errorHandler } from './middleware/auth.middleware.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import cldRouter from './routes/cloudinary.route.js';
import path from 'path';

const app = express();
const __dirname = path.resolve();
const PORT = 8000;

app.use('/images', express.static(path.join(__dirname, '/images')));
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());
app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
    })
)

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/image', cldRouter);

app.use('*', (req, res) => {
    res.status(404).json({ message: 'not found' });
});

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});