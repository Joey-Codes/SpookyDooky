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

export {router as reviewsRouter};