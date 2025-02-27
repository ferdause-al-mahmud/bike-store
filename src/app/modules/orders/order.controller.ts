import { Request, Response } from 'express';
import { orderService } from './order.service';
import Order from './order.model';
import Bike from '../bikes/bike.model';
import { catchAsync } from '../../utils/catchAsync';

const createOrder = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body;
    const bike = await Bike.findById(payload.product);

    if (!bike) {
        return res.status(404).json({ status: false, message: 'Bike not found' });
    }

    if (bike.quantity < payload.quantity) {
        return res.status(400).json({
            status: false,
            message: `Insufficient stock. Only ${bike.quantity} units available.`,
        });
    }

    bike.quantity -= payload.quantity;
    bike.inStock = bike.quantity > 0;
    await bike.save();

    const result = await orderService.createOrder(payload);
    res.status(201).json({ message: 'Order created successfully', status: true, data: result });
});

const getAllOrders = catchAsync(async (req: Request, res: Response) => {
    const result = await orderService.getAllOrders();
    res.status(200).json({ message: 'Orders retrieved successfully', status: true, data: result });
});

const getRevenue = catchAsync(async (req: Request, res: Response) => {
    const result = await Order.aggregate([
        {
            $lookup: {
                from: 'bikes',
                localField: 'product',
                foreignField: '_id',
                as: 'bikeDetails',
            },
        },
        { $unwind: '$bikeDetails' },
        { $project: { totalPrice: { $multiply: ['$bikeDetails.price', '$quantity'] } } },
        { $group: { _id: null, totalRevenue: { $sum: '$totalPrice' } } },
    ]);

    const totalRevenue = result.length ? result[0].totalRevenue : 0;
    res.status(200).json({ message: 'Revenue calculated successfully', status: true, data: { totalRevenue } });
});

const updateOrder = catchAsync(async (req: Request, res: Response) => {
    const { orderId } = req.params;
    const result = await orderService.updateOrder(orderId, req.body);
    res.json({ status: true, message: 'Order updated successfully', data: result });
});

export const orderController = { createOrder, getRevenue, getAllOrders, updateOrder };
