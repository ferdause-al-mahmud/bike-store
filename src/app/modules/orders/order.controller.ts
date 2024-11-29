/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { orderService } from './order.service';
import Order from './order.model';
import Bike from '../bikes/bike.model';

const createOrder = async (req: Request, res: Response) => {
    try {
        const payload = req.body;

        const bike = await Bike.findById(payload.product);
        if (!bike) {
            return res.status(404).json({
                status: false,
                message: 'Bike not found',
            });
        }

        if (bike.quantity < payload.quantity) {
            return res.status(400).json({
                status: false,
                message: `Insufficient stock. Only ${bike.quantity} units available.`,
            });
        }

        bike.quantity -= payload.quantity;
        if (bike.quantity === 0) {
            bike.inStock = false;
        }
        await bike.save();

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
            error: error.message,
            stack: error?.stack,
        });
    }
};

const getAllOrders = async (req: Request, res: Response) => {
    try {
        const result = await orderService.getAllOrders();

        res.status(200).json({
            message: 'Orders retrieved successfully',
            status: true,
            data: result,
        });
    } catch (error: any) {
        res.status(500).json({
            status: false,
            message: 'Something went wrong when retrieving orders',
            error: error.message,
            stack: error?.stack,
        });
    }
};

const getRevenue = async (req: Request, res: Response) => {
    try {
        const result = await Order.aggregate([
            {
                $lookup: {
                    from: 'bikes',
                    localField: 'product',
                    foreignField: '_id',
                    as: 'bikeDetails',
                },
            },
            {
                $unwind: '$bikeDetails',
            },
            {
                $project: {
                    totalPrice: { $multiply: ['$bikeDetails.price', '$quantity'] },
                },
            },
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: '$totalPrice' },
                },
            },
        ]);

        const totalRevenue = result.length > 0 ? result[0].totalRevenue : 0;

        res.status(200).json({
            message: 'Revenue calculated successfully',
            status: true,
            data: {
                totalRevenue,
            },
        });
    } catch (error: any) {
        res.status(500).json({
            status: false,
            message: 'Something went wrong',
            error: error.message,
            stack: error?.stack,
        });
    }
};

export const orderController = {
    createOrder,
    getRevenue,
    getAllOrders,
};
