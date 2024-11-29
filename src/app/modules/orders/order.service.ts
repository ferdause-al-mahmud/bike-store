import { IOrder } from "./order.interface";
import Order from "./order.model";


const createOrder = async (payload: IOrder): Promise<IOrder> => {

    const result = await Order.create(payload,);
    return result;

};
const getAllOrders = async (): Promise<IOrder[]> => {
    const result = await Order.find();
    return result;
};


export const orderService = {
    createOrder,
    getAllOrders
};
