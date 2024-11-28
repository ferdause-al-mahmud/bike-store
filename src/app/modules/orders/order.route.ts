import express from 'express';

import { orderController } from "./order.controller";

const orderRouter = express.Router();

orderRouter.post("/", orderController.createOrder);


export default orderRouter;
