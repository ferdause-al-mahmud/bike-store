/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { bikeService } from './bike.service';
import { catchAsync } from '../../utils/catchAsync';

const createBike = catchAsync(async (req: Request, res: Response) => {
    const result = await bikeService.createBike(req.body);
    res.status(201).json({ message: 'Bike created successfully', status: true, data: result });
});

const getBikes = catchAsync(async (req: Request, res: Response) => {
    const { searchTerm } = req.query;
    const filter = searchTerm
        ? { $or: [{ name: new RegExp(searchTerm as string, 'i') }, { brand: new RegExp(searchTerm as string, 'i') }, { category: new RegExp(searchTerm as string, 'i') }] }
        : {};

    const result = await bikeService.getBikes(filter);
    if (!result.length) {
        return res.status(404).json({ message: 'No bikes found matching the search criteria', status: false, data: [] });
    }

    res.status(200).json({ message: 'Bikes retrieved successfully', status: true, data: result });
});

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

export const BikeController = { createBike, getBikes, getSingleBike, updateBike, deleteBike };
