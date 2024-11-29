import express, { Application } from 'express';
import cors from 'cors';
import bikeRouter from './app/modules/bikes/bike.route';
import orderRouter from './app/modules/orders/order.route';

const app: Application = express();

app.use(express.json());
app.use(cors());

// Root route
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to the Bike Store API!',
        status: true,
    });
});

app.use('/api/products', bikeRouter);
app.use('/api/orders', orderRouter);

export default app;
