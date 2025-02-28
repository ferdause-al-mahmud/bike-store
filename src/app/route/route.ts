import { Router } from 'express';
import { userRoute } from '../modules/user/user.route';
import bikeRouter from '../modules/bikes/bike.route';
import orderRouter from '../modules/orders/order.route';
import { adminRoute } from '../modules/admin/admin.route';
const route = Router();

const modules = [
    { path: '/auth', route: userRoute },
    { path: '/bikes', route: bikeRouter },
    { path: '/orders', route: orderRouter },
    { path: '/admin', route: adminRoute },

];

modules.forEach((el) => route.use(el.path, el.route));

export default route;
