import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import authRoute from './routes/authRoute';
import { connectToDatabase } from './config/database';
import errorHandler from './middlewares/errorHandler';
import logger from './utils/logger';
import requestLogger from './utils/requestLogger';
 dotenv.config();
 
const app = express();



app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors({
  origin: ['http://localhost:5173','https://ems-beta-seven.vercel.app'], 
  credentials: true, 
}));
app.use(requestLogger);
app.use('/', authRoute);
app.use(errorHandler);

const PORT=8080;

logger.info('App is starting...');

connectToDatabase().then(() => {
  logger.info('Connected to the database');
  app.listen(8080, () => {
    logger.info(`Server is running on port ${PORT}`);
  });
  
}).catch((error) => {
  logger.error('Failed to connect to the database:', error);
});

export default app;


