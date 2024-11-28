import mongoose, { Schema } from "mongoose";
import { IBike } from "./bike.interface";

const bikeSchema = new Schema<IBike>(
    {
        name: {
            type: String,
            required: [true, "Bike name is required"],
            minlength: [3, "Bike name must be at least 3 characters long"]
        },
        brand: {
            type: String,
            required: [true, "Brand is required"],
        },
        price: {
            type: Number,
            required: [true, "Price is required"],
            min: [0, "Price must be a positive number"],
        },
        category: {
            type: String,
            enum: {
                values: ["Mountain", "Road", "Hybrid", "Electric"],
                message: "Category must be one of Mountain, Road, Hybrid, or Electric",
            },
            required: [true, "Category is required"],
        },
        description: {
            type: String,
            required: [true, "Description is required"],
            maxlength: [500, "Description cannot exceed 500 characters"],
        },
        quantity: {
            type: Number,
            required: [true, "Quantity is required"],
            min: [0, "Quantity must be a non-negative number"],
        },
        inStock: {
            type: Boolean,
            required: [true, "InStock status is required"],
        },

    },
    {
        timestamps: true,
    }
);

const Bike = mongoose.model<IBike>("Bike", bikeSchema);

export default Bike;
