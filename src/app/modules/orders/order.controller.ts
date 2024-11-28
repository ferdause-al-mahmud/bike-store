/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { orderService } from './order.service';
const createOrder = async (req: Request, res: Response) => {
    try {
        const payload = req.body;
        const result = await orderService.createOrder(payload);

        res.status(201).json({
            message: 'Order created successfully',
            status: true,
            data: result,
        });
    } catch (error: any) {
        res.status(500).json({
            status: false,
            message: 'Something went wrong',
            error: error,
            stack: error?.stack
        });
    }
};

export const orderController = {
    createOrder,
};
