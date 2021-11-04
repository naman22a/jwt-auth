import express, { Application } from 'express';
import cors from 'cors';

// DOTENV CONFIG
import dotenv from 'dotenv';
dotenv.config();

// DB CONNECTION
import './db/connection';

// IMPORTING ROUTES
import authRoutes from './routes/auth';

const app: Application = express();
const PORT = process.env.PORT ?? 5000;

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// ROUTES
app.use('/auth', authRoutes);

// STARTING THE SERVER
app.listen(PORT, () => {
	console.log(`Server running at port: ${PORT}`);
});