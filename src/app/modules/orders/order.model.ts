import mongoose, { Schema } from 'mongoose';
import { IOrder } from './order.interface';

const orderSchema = new Schema<IOrder>({
    email: {
        type: String,
        required: [true, 'Email is required'],
        match: [/\S+@\S+\.\S+/, 'Please provide a valid email address'], // Email validation
    },
    product: {
        type: Schema.Types.ObjectId, // Reference to the Product model
        required: [true, 'Product is required'],
        ref: 'Bike', // Reference to the 'Bike' model
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
        min: [1, 'Quantity must be at least 1'], // Quantity validation
    },
    totalPrice: {
        type: Number,
        required: [true, 'Total price is required'],
        min: [0, 'Total price must be a positive number'], // Price validation
    },
}, { timestamps: true });

const Order = mongoose.model<IOrder>('Order', orderSchema);

export default Order;
