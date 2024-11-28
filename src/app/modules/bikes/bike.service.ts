import { IBike } from "./bike.interface";
import Bike from "./bike.model";


const createBike = async (payload: IBike): Promise<IBike> => {

    const result = await Bike.create(payload,);
    return result;

};


const getBikes = async (): Promise<IBike[]> => {
    const result = await Bike.find();
    return result;
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
