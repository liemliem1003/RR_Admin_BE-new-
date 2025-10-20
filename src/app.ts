import express, { Application } from 'express';
import bodyParser from 'body-parser';
import { logger } from './config/logger';
import { testDBConnection } from './config/db';
import routes from './routes/index';
import { errorMiddleware } from './middleware/error.middleware';
import cors from 'cors';
import path from 'path';

const app: Application = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Cấu hình CORS
app.use(cors({
  origin: ['http://localhost:4200', 'https://rr-admin-fe-new.onrender.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', "PATCH"],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Routes
app.use('/', routes);
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
// Error handling
app.use(errorMiddleware);

// Test DB connection
testDBConnection();

export default app;
