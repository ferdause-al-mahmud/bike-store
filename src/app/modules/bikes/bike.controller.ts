/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { bikeService } from './bike.service';

const createBike = async (req: Request, res: Response) => {
    try {
        const payload = req.body;
        const result = await bikeService.createBike(payload);

        res.status(201).json({
            message: 'Bike created successfully',
            status: true,
            data: result,
        });
    } catch (error: any) {
        res.status(500).json({
            status: false,
            message: `Validation failed`,
            error: error,
            stack: error?.stack
        });
    }
};

const getBikes = async (req: Request, res: Response) => {
    try {
        const result = await bikeService.getBikes();

        res.status(200).json({
            message: 'Bikes retrieved successfully',
            status: true,
            data: result,
        });
    } catch (error: any) {
        res.status(500).json({
            status: false,
            message: 'Something went wrong when retrieving bikes',
            error,
            stack: error?.stack
        });
    }
};

const getSingleBike = async (req: Request, res: Response) => {
    try {
        const productId = req.params.productId;
        const result = await bikeService.getSingleBike(productId);

        if (!result) {
            res.status(404).json({
                status: false,
                message: 'Bike not found',
            });
            return;
        }

        res.status(200).json({
            message: 'Bike retrieved successfully',
            status: true,
            data: result,
        });
    } catch (error: any) {
        res.status(500).json({
            message: 'Something went wrong when retrieving the bike',
            status: false,
            error,
            stack: error?.stack
        });
    }
};

const updateBike = async (req: Request, res: Response) => {
    try {
        const productId = req.params.productId;
        const body = req.body;
        const result = await bikeService.updateBike(productId, body);

        if (!result) {
            res.status(404).json({
                message: 'Bike not found',
                status: false,
            });
            return;
        }

        res.status(200).json({
            status: true,
            message: 'Bike updated successfully',
            data: result,
        });
    } catch (error: any) {
        res.status(500).json({
            message: 'Something went wrong when updating the bike',
            status: false,
            error,
            stack: error?.stack
        });
    }
};

const deleteBike = async (req: Request, res: Response) => {
    try {
        const productId = req.params.productId;
        const result = await bikeService.deleteBike(productId);

        if (!result) {
            res.status(404).json({
                message: 'Bike not found',
                status: false,

            });
            return;
        }

        res.status(200).json({
            message: 'Bike deleted successfully',
            status: true,
            data: {},
        });
    } catch (error: any) {
        res.status(500).json({
            message: 'Something went wrong when deleting the bike',
            status: false,
            error,
            stack: error?.stack
        });
    }
};

export const BikeController = {
    createBike,
    getBikes,
    getSingleBike,
    updateBike,
    deleteBike,
};
