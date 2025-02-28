import { IOrder } from "./order.interface";
import Order from "./order.model";


const createOrder = async (payload: IOrder): Promise<IOrder> => {

    const result = await Order.create(payload,);
    return result;

};
const getAllOrders = async (): Promise<IOrder[]> => {
    const result = await Order.find({}).populate('product');
    return result;
};

const getUserOrder = async (email: string) => {
    const result = await Order.find({ email }).populate('product');
    return result;
};


const updateOrder = async (id: string, payload: Partial<IOrder>) => {
    const result = await Order.findByIdAndUpdate(id, payload, { new: true });
    return result;
};

export const orderService = {
    createOrder,
    getAllOrders,
    updateOrder,
    getUserOrder
};
