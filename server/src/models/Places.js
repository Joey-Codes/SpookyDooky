import mongoose from "mongoose";

const PlacesSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    address: { type: String, required: true },
});

export const PlacesModel = mongoose.model("places", PlacesSchema); 