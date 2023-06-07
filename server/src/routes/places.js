import express from "express";
import mongoose from "mongoose";
import { PlacesModel } from "../models/Places.js";
import { verifyToken } from "./users.js";
import { ReviewModel } from "../models/Reviews.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const response = await PlacesModel.find({});
        res.json(response);
    } catch(err) {
        res.json(err);
    }
});

router.post("/", async (req, res) => {
    const recipe = new PlacesModel(req.body);
    try {
        const response = await recipe.save();
        res.json(response);
    } catch(err) {
        res.json(err);
    }
});

router.get("/:id", async (req, res) => {
    try {
      const place = await PlacesModel.findById(req.params.id).exec();
      return res.send(place);
    } catch (err) {
      return res.status(500).send(err);
    }
  });
  

  router.get("/:id/reviews", async (req, res) => {
    try {
      const reviews = await ReviewModel.find({ placeId: req.params.id }).populate('placeId');
      res.send(reviews);  
    } catch (err) {
      res.status(500).send(err);
    }
  });
  

export {router as placesRouter};