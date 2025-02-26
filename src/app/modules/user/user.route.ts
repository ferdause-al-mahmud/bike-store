import { Router } from 'express';
import { userControllers } from './user.controller';
import { auth } from '../../middleware/auth';

const route = Router();

route.post('/signup', userControllers.registerUser);
route.post('/login', userControllers.loginUser);
route.patch('/change-password', auth('admin', 'customer'), userControllers.changePassword);

route.post('/refresh-token', userControllers.refreshToken);

route.get('/all-user', auth('admin'), userControllers.getAlluser);
route.get('/user/:userId', auth('admin'), userControllers.getSingleUser);
route.get('/user/getCurrentUser/:userId', auth('admin', 'customer'), userControllers.getCurrentUser);
route.put('/user/:userId', auth('admin'), userControllers.updateUser);
route.put('/user/change-password/:userId', auth('admin', 'customer'), userControllers.changePassword);

export const userRoute = route;
