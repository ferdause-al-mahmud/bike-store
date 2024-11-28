import express, { Application } from 'express';
import cors from 'cors';
import bikeRouter from './modules/bikes/bike.route';
import orderRouter from './modules/orders/order.route';

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api/products', bikeRouter);

app.use('/api/orders', orderRouter);



export default app;
