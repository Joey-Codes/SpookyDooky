import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
    rating: { type: Number, required: true },
    description: { type: String, required: true },
});

export const ReviewModel = mongoose.model("reviews", ReviewSchema); 