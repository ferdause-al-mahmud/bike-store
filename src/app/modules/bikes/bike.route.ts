import express from 'express';
import { BikeController } from './bike.controller';

const bikeRouter = express.Router();

bikeRouter.post('/', BikeController.createBike);
bikeRouter.get('/', BikeController.getBikes);
bikeRouter.get('/:productId', BikeController.getSingleBike);
bikeRouter.put('/:productId', BikeController.updateBike);
bikeRouter.delete('/:productId', BikeController.deleteBike);

export default bikeRouter;
