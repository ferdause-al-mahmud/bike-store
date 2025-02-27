import { IBike } from "./bike.interface";
import Bike from "./bike.model";
import QueryBuilder from "../../builder/QueryBuilder";


const createBike = async (payload: IBike): Promise<IBike> => {

    const result = await Bike.create(payload,);
    return result;

};


const getBikes = async (query: Record<string, unknown>): Promise<{ bikes: IBike[], totalItems: number }> => {
    // Create a query builder instance without pagination for counting total items
    const totalQuery = new QueryBuilder(Bike.find(), query)
        .search(['name', 'brand', 'category'])
        .price()
        .filter();

    const totalItems = await totalQuery.modelQuery.clone().countDocuments(); // Count total items

    // Apply pagination after counting total items
    const bikeQuery = totalQuery.sort().paginate();
    const bikes = await bikeQuery.modelQuery;

    return { bikes, totalItems }; // Return both bikes and total count
};


const getSingleBike = async (id: string): Promise<IBike | null> => {
    const result = await Bike.findById(id);
    return result;
};

const updateBike = async (id: string, data: IBike): Promise<IBike | null> => {
    const result = await Bike.findByIdAndUpdate(id, { ...data }, { new: true, runValidators: true });
    return result;
};

const deleteBike = async (id: string): Promise<IBike | null> => {
    const result = await Bike.findByIdAndDelete(id);
    return result;
};

export const bikeService = {
    createBike,
    getBikes,
    getSingleBike,
    updateBike,
    deleteBike,
};
