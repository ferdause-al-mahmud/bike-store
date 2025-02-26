import express, { Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { notFound } from './app/middleware/notFound';
import { globalErrorHandler } from './app/middleware/globalErrorHandler';
import route from './app/route/route';
const app = express();

app.use(express.json());
app.use(
    cors({
        origin: ['http://localhost:5173'],
        credentials: true,
    }),
);
app.use(cookieParser());

app.use('/api', route);

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: 'Welcome to Bike Store',
    });
});

app.use(globalErrorHandler);

app.use(notFound);

export default app;
