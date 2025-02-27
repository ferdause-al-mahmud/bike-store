import express from 'express';
import { BikeController } from './bike.controller';
import { auth } from '../../middleware/auth';

const bikeRouter = express.Router();

bikeRouter.post('/', auth('admin'), BikeController.createBike);
bikeRouter.get('/', BikeController.getAllBikes);
bikeRouter.get('/:productId', BikeController.getSingleBike);
bikeRouter.put('/:productId', auth('admin'), BikeController.updateBike);
bikeRouter.delete('/:productId', auth('admin'), BikeController.deleteBike);

export default bikeRouter;
