import express from 'express';
import authRoutes from './routes/auth.route.js';
import dotenv from 'dotenv';
import cors from 'cors';

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true

}
));

dotenv.config()

//helps read json data
app.use(express.json());

app.use('/api/auth', authRoutes);

export default app;

