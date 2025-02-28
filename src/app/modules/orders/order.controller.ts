import { Request, Response } from 'express';
import { orderService } from './order.service';
import Order from './order.model';
import Bike from '../bikes/bike.model';
import { catchAsync } from '../../utils/catchAsync';
import { IOrder } from './order.interface';

const createOrder = catchAsync(async (req: Request, res: Response) => {
    const { product: bikeId, quantity, email, totalPrice } = req.body; // Extract all required fields

    // Find the bike
    const bike = await Bike.findById(bikeId);

    if (!bike) {
        return res.status(404).json({
            status: false,
            message: "Bike not found"
        });
    }

    // Check stock availability
    if (bike.quantity < quantity) {
        return res.status(400).json({
            status: false,
            message: `Insufficient stock. Only ${bike.quantity} units available.`,
        });
    }

    // Update bike stock
    bike.quantity -= quantity;
    bike.inStock = bike.quantity > 0;
    await bike.save();
    // Create order payload
    const orderData: IOrder = {
        product: bike._id, // Make sure product is set as an ObjectId
        quantity,
        email,
        totalPrice,
        status: "pending", // Default order status
    };

    // Create order in database
    const order = await orderService.createOrder(orderData);

    return res.status(201).json({
        message: "Order created successfully",
        status: true,
        data: order
    });
});
const getAllOrders = catchAsync(async (req: Request, res: Response) => {
    const result = await orderService.getAllOrders();
    res.status(200).json({ message: 'Orders retrieved successfully', status: true, data: result });
});

const getUserOrder = catchAsync(async (req: Request, res: Response) => {
    const { email } = req.params;
    const result = await orderService.getUserOrder(email);
    res.json({
        status: true,
        message: 'Order retrived successfully',
        data: result,
    });
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
        { $group: { _id: null, totalRevenuee: { $sum: '$totalPrice' } } },
    ]);

    const totalRevenuee = result.length ? result[0].totalRevenuee : 0;
    res.status(200).json({ message: 'Revenue calculated successfully', status: true, data: { totalRevenuee } });
});

const updateOrder = catchAsync(async (req: Request, res: Response) => {
    const { orderId } = req.params;
    const result = await orderService.updateOrder(orderId, req.body);
    res.json({ status: true, message: 'Order updated successfully', data: result });
});

export const orderController = { createOrder, getRevenue, getAllOrders, updateOrder, getUserOrder };
