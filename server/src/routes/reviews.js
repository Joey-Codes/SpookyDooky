import express from "express";
import mongoose from "mongoose";
import { ReviewModel } from "../models/Reviews.js";
import { verifyToken } from "./users.js";

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

/* Increment a review's like by 1 */
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

/* Increment a review's like by 1 */
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


export {router as reviewsRouter};