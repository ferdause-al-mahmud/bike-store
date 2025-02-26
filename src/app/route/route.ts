import { Router } from 'express';
import { userRoute } from '../modules/user/user.route';
const route = Router();

const modules = [
    { path: '/auth', route: userRoute }
];

modules.forEach((el) => route.use(el.path, el.route));

export default route;
