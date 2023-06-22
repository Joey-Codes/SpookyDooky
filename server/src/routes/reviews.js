import express from "express";
import mongoose from "mongoose";
import { ReviewModel } from "../models/Reviews.js";
import { PlacesModel } from "../models/Places.js";
import { verifyToken } from "./users.js";
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

/* Increment a review's likes by 1 */
router.put('/:id/like', async (req, res) => {
    try {
      const reviewId = req.params.id;
      const review = await ReviewModel.findById(reviewId);
  
      if (!review) {
        return res.status(404).json({ error: 'Review not found' });
      }
  
      review.likes += 1;
      await review.save();
  
      return res.json({ message: 'Like added successfully', review });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Server error' });
    }
  });

/* Increment a review's dislikes by 1 */
router.put('/:id/dislike', async (req, res) => {
    try {
      const reviewId = req.params.id;
      const review = await ReviewModel.findById(reviewId);
  
      if (!review) {
        return res.status(404).json({ error: 'Review not found' });
      }
  
      review.dislikes += 1;
      await review.save();
  
      return res.json({ message: 'Like added successfully', review });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Server error' });
    }
  });

  router.get('/owner/:reviewId', async (req, res) => {
    try {
      const { reviewId } = req.params;
  
      // Find the review by reviewId
      const review = await ReviewModel.findById(reviewId);
  
      if (!review) {
        return res.status(404).json({ message: 'Review not found' });
      }
  
      // Find the user by userId associated with the review
      const user = await UserModel.findById(review.userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Return the username
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
      // Find the review by ID
      const review = await ReviewModel.findById(reviewId);
  
      if (!review) {
        return res.status(404).json({ error: 'Review not found' });
      }
  
      // Get the placeId associated with the review
      const placeId = review.placeId;
  
      // Delete the review
      await review.deleteOne();
  
      // Update the place information
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