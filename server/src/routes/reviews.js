import express from "express";
import mongoose from "mongoose";
import { ReviewModel } from "../models/Reviews.js";
import { PlacesModel } from "../models/Places.js";
import { UserModel } from "../models/Users.js";

const router = express.Router();

/* Retrieve all Reviews */
router.get("/", async (req, res) => {
    try {
        const response = await ReviewModel.find({});
        res.json(response);
    } catch(err) {
        res.json(err);
    }
});

  /* Post a new Review */
  router.post("/", async (req, res) => {
      const review = new ReviewModel(req.body);
      try {
          const response = await review.save();
          res.json(response);
      } catch(err) {
          res.json(err);
      }
  });


router.get('/owner/:reviewId', async (req, res) => {
  try {
    const { reviewId } = req.params;

    const review = await ReviewModel.findById(reviewId);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    const user = await UserModel.findById(review.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ username: user.username });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});


  /* Delete a review given its ID */
  router.delete('/delete/:id', async (req, res) => {
    const reviewId = req.params.id;
  
    try {
      const review = await ReviewModel.findById(reviewId);
  
      if (!review) {
        return res.status(404).json({ error: 'Review not found' });
      }
  
      const placeId = review.placeId;
  
      await review.deleteOne();
  
      const averageRating = await ReviewModel.aggregate([
        { $match: { placeId } },
        { $group: { _id: null, averageRating: { $avg: '$rating' } } },
      ]);
  
      const place = await PlacesModel.findById(placeId);
      place.rating = averageRating.length > 0 ? averageRating[0].averageRating : 0;
      place.numRatings = await ReviewModel.countDocuments({ placeId });
      await place.save();
  
      return res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });
  


export {router as reviewsRouter};