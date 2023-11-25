import express from "express";
import mongoose from "mongoose";
import { ReviewModel } from "../models/Reviews.js";
import { PlacesModel } from "../models/Places.js";
import { UserModel } from "../models/Users.js";
import vision from "@google-cloud/vision";
import {v2 as cloudinary } from 'cloudinary';
import { extractPublicId } from 'cloudinary-build-url';

const router = express.Router();

const client = new vision.ImageAnnotatorClient();

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

  /* Given a userID retrieve all the user's reviews */
  router.get('/find/:userID', async (req, res) => {
    const userID = req.params.userID;
  
    try {
      const reviews = await ReviewModel.find({ userId: userID });
  
      if (reviews.length === 0) {
        return res.status(404).json({ message: 'No reviews found for the provided userID.' });
      }
  
      res.status(200).json(reviews);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });


/* Given a reviewID find its User Owner */
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

/* Check review image for NSFW content */
router.post('/checkimage', async (req, res) => {
  try {
    const cloudinaryImageUrl = req.body.imageUrl;
    const [result] = await client.safeSearchDetection(cloudinaryImageUrl);
    const safeSearchAnnotation = result.safeSearchAnnotation;

    const isNSFW =
      safeSearchAnnotation.adult === 'LIKELY' ||
      safeSearchAnnotation.adult === 'VERY_LIKELY' ||
      safeSearchAnnotation.violence === 'LIKELY' ||
      safeSearchAnnotation.violence === 'VERY_LIKELY';

      if (isNSFW) {
        try {
          const publicId = extractPublicId(cloudinaryImageUrl);
          const deletionResponse = await cloudinary.uploader.destroy(publicId);
          console.log(`Deleted image: ${deletionResponse.result}`);
          res.json({ isNSFW });
        } catch (cloudinaryError) {
          console.error('Error deleting image from Cloudinary:', cloudinaryError);
          res.status(500).json({ message: 'Error deleting image from Cloudinary.' });
        }
      } else {
        res.json({ isNSFW });
      }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

/* Edit a review's description */
router.patch('/edit/:id', async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid review ID' });
    }

    const updatedReview = await ReviewModel.findByIdAndUpdate(
      id,
      { $set: { description } },
      { new: true } 
    );

    if (!updatedReview) {
      return res.status(404).json({ message: 'Review not found' });
    }

    return res.status(200).json({ message: 'Review edited successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
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

      if (review.img != "") {
        try {
          const publicId = extractPublicId(review.img);
          const deletionResponse = await cloudinary.uploader.destroy(publicId);
          console.log(`Deleted image: ${deletionResponse.result}`);
        } catch (cloudinaryError) {
          console.error('Error deleting image from Cloudinary:', cloudinaryError);
          return res.status(500).json({ error: 'Error deleting image from Cloudinary.' });
        }
      } 
      
      if (review.img2 != "") {
        try {
          const publicId2 = extractPublicId(review.img2);
          const deletionResponse2 = await cloudinary.uploader.destroy(publicId2);
          console.log(`Deleted image2: ${deletionResponse2.result}`);
        } catch (cloudinaryError) {
          console.error('Error deleting image2 from Cloudinary:', cloudinaryError);
          return res.status(500).json({ error: 'Error deleting image2 from Cloudinary.' });
        }
      }
  
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