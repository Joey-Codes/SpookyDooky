import mongoose from "mongoose";

const PlacesSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    rating: { type: Number, min: 1, max: 5, required: true},
    numRatings: { type: Number },
    address: { type: String, required: true },
    img: { },
    description: { type: String, required: true},
});

export const PlacesModel = mongoose.model("places", PlacesSchema); 