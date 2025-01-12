import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import authRoute from './routes/authRoute';
import { connectToDatabase } from './config/database';
import errorHandler from './middlewares/errorHandler';
 dotenv.config();
 
const app = express();



app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors({
  origin: ['http://localhost:5173','https://ems-beta-seven.vercel.app'], 
  credentials: true, 
}));

app.use('/', authRoute);
app.use(errorHandler);

const PORT=8080;

console.log('App is starting...');

connectToDatabase().then(() => {
  console.log('Connected to the database');
  app.listen(8080, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  
}).catch((error) => {
  console.error('Failed to connect to the database:', error);
});


