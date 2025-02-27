import { IBike } from "./bike.interface";
import Bike from "./bike.model";
import QueryBuilder from "../../builder/QueryBuilder";


const createBike = async (payload: IBike): Promise<IBike> => {

    const result = await Bike.create(payload,);
    return result;

};


const getBikes = async (query: Record<string, unknown>): Promise<IBike[]> => {

    const bikeQuery = new QueryBuilder(Bike.find(), query)
        .search(['name', 'brand', 'category'])
        .price()
        .filter()
        .sort()
        .paginate();

    return await bikeQuery.modelQuery;
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
