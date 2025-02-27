import { Router } from 'express';
import { userRoute } from '../modules/user/user.route';
import bikeRouter from '../modules/bikes/bike.route';
import orderRouter from '../modules/orders/order.route';
const route = Router();

const modules = [
    { path: '/auth', route: userRoute },
    { path: '/bikes', route: bikeRouter },
    { path: '/orders', route: orderRouter },
];

modules.forEach((el) => route.use(el.path, el.route));

export default route;
