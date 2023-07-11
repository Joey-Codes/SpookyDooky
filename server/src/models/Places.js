import mongoose from "mongoose";

const PlacesSchema = new mongoose.Schema({
    name: { type: String, required: true, },
    rating: { type: Number, min: 0, max: 5, required: true},
    numRatings: { type: Number },
    address: { type: String, required: true, unique: true },
    img: { type: String },
    website: { type: String },
    lat: { type: Number },
    long: { type: Number },
    createdAt: { type: Date, default: Date.now },
});


export const PlacesModel = mongoose.model("places", PlacesSchema); 

PlacesModel.createIndexes({ name: "text", address: "text", description: "text" });
