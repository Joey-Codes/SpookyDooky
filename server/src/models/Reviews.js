import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
    rating: { type: Number, min: 1, max: 5, required: true },
    category: { type: String, enum: ['Paranormal', 'Aliens', 'Cryptids', 'Unexplained'], required: true },
    likes: { type: Number, required: true },
    dislikes: { type: Number, required: true },
    description: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    placeId: { type: mongoose.Schema.Types.ObjectId, ref: "places" },
});

export const ReviewModel = mongoose.model("reviews", ReviewSchema); 