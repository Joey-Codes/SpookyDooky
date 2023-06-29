import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
    rating: { type: Number, min: 1, max: 5, required: true },
    category: { type: String, enum: ['Ghosts', 'Aliens', 'Cryptids', 'Unexplained'], required: true },
    description: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    placeId: { type: mongoose.Schema.Types.ObjectId, ref: "places" },
    createdAt: { type: Date, default: Date.now },
});

ReviewSchema.post('save', async function () {
    const placeId = this.placeId;
    const averageRating = await this.model('reviews').aggregate([
      { $match: { placeId } },
      { $group: { _id: null, averageRating: { $avg: '$rating' } } },
    ]);
  
    const placesModel = mongoose.model('places');
    const place = await placesModel.findById(placeId);
  
    place.rating = averageRating.length > 0 ? averageRating[0].averageRating : 0;
    place.numRatings = await this.model('reviews').countDocuments({ placeId });
    await place.save();
  });

export const ReviewModel = mongoose.model("reviews", ReviewSchema); 