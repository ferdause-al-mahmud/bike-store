/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { bikeService } from './bike.service';
import { catchAsync } from '../../utils/catchAsync';

const createBike = catchAsync(async (req: Request, res: Response) => {
    const result = await bikeService.createBike(req.body);
    res.status(201).json({ message: 'Bike created successfully', status: true, data: result });
});
const getAllBikes = async (req: Request, res: Response) => {
    try {
        const query = req.query;
        const { bikes, totalItems } = await bikeService.getBikes(query);

        res.json({
            status: true,
            message: 'Bikes retrieved successfully',
            data: bikes,
            totalItems, // Send total number of bikes
        });
    } catch (error: any) {
        res.status(400).json({
            status: false,
            message: 'Validation failed',
            error: error.message,
            stack: error?.stack,
        });
    }
};


const getSingleBike = catchAsync(async (req: Request, res: Response) => {
    const result = await bikeService.getSingleBike(req.params.productId);
    if (!result) {
        return res.status(404).json({ status: false, message: 'Bike not found' });
    }

    res.status(200).json({ message: 'Bike retrieved successfully', status: true, data: result });
});

const updateBike = catchAsync(async (req: Request, res: Response) => {
    const result = await bikeService.updateBike(req.params.productId, req.body);
    if (!result) {
        return res.status(404).json({ message: 'Bike not found', status: false });
    }

    res.status(200).json({ status: true, message: 'Bike updated successfully', data: result });
});

const deleteBike = catchAsync(async (req: Request, res: Response) => {
    const result = await bikeService.deleteBike(req.params.productId);
    if (!result) {
        return res.status(404).json({ message: 'Bike not found', status: false });
    }

    res.status(200).json({ message: 'Bike deleted successfully', status: true, data: {} });
});

export const BikeController = {
    createBike,
    //  getBikes,
    getAllBikes,
    getSingleBike,
    updateBike,
    deleteBike
};
