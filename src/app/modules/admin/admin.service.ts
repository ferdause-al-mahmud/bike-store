
import Bike from '../bikes/bike.model';
import Order from '../orders/order.model';
import { User } from '../user/user.model';

const getAdminData = async () => {
  const totalOrder = await Order.estimatedDocumentCount();
  const totalUser = await User.estimatedDocumentCount();
  const totalBike = await Bike.estimatedDocumentCount();
  const totalRevenue = await Order.aggregate([
    { $project: { totalPrice: 1, quantity: 1 } },
    {
      $group: {
        _id: null,
        price: { $sum: '$totalPrice' },
      },
    },
  ]);
  return {
    totalBike,
    totalOrder,
    totalUser,
    totalRevenue,
  };
};

export const adminServices = {
  getAdminData,
};
