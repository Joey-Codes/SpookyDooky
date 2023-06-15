import express from "express";
import mongoose from "mongoose";
import { PlacesModel } from "../models/Places.js";
import { verifyToken } from "./users.js";
import { ReviewModel } from "../models/Reviews.js";

const router = express.Router();

/* Retrieve all Places */
router.get("/", async (req, res) => {
    try {
        const response = await PlacesModel.find({});
        res.json(response);
    } catch(err) {
        res.json(err);
    }
});

/* Retrieve Places based on a search query */
router.get("/searchquery/:query", async (req, res) => {
  try {
    const { query } = req.params;
    const regex = new RegExp(query, "i");
    const response = await PlacesModel.find({
      $or: [
        { name: { $regex: regex } },
        { address: { $regex: regex } },
        { description: { $regex: regex } },
        // add more fields as needed
      ]
    });
    res.json(response);
  } catch(err) {
    res.json(err);
  }
});


/* Post a new Place */
router.post("/", async (req, res) => {
    const recipe = new PlacesModel(req.body);
    try {
        const response = await recipe.save();
        res.json(response);
    } catch(err) {
        res.json(err);
    }
});

/* Retrieve specific Place by ID */
router.get("/:id", async (req, res) => {
    try {
      const place = await PlacesModel.findById(req.params.id).exec();
      return res.send(place);
    } catch (err) {
      return res.status(500).send(err);
    }
  });
  
/* Retrieve all Reviews associated with Place */
  router.get("/:id/reviews", async (req, res) => {
    try {
      const reviews = await ReviewModel.find({ placeId: req.params.id }).populate('placeId');
      res.send(reviews);  
    } catch (err) {
      res.status(500).send(err);
    }
  });

  /* Retrieve all Reviews associated with Place sorted by filter */
  router.get("/:id/reviews/:filter", async (req, res) => {
    try {
      const { id, filter } = req.params;
      let sortCondition;
  
      switch (filter) {
        case 'toprated':
          sortCondition = { rating: -1 };
          break;
        case 'lowestrated':
          sortCondition = { rating: 1 };
          break;
        case 'mostliked':
          sortCondition = { likes: -1 };
          break;
        case 'mostdisliked':
          sortCondition = { dislikes: -1 };
          break;
        default:
          sortCondition = { rating: -1 };
          break;
      }
  
      const reviews = await ReviewModel.find({ placeId: id })
        .populate('placeId')
        .sort(sortCondition);
  
      res.send(reviews);
    } catch (err) {
      res.status(500).send(err);
    }
  });  

  /* Retrieve Place by 'name' field */
  router.get("/search/:name", async (req, res) => {
    try {
      const name = req.params.name;
      const places = await PlacesModel.find({ name: { $eq: name } });
      res.send(places);
      console.log("Response sent successfully"); // Check if this gets logged
    } catch (err) {
      res.status(500).send(err);
    }
  });  
  
  /* Retrieve Place by 'address' field */
  router.get("/search/address/:address", async (req, res) => {
    try {
      const address = req.params.address;
      const place = await PlacesModel.find({ address: { $eq: address} });
      res.send(place);
      console.log("Response sent successfully");
    } catch (err) {
      res.status(500).send(err);
    }
  });  

  /* Delete Place by ID */
  router.delete("/delete/:id", async (req, res) => {
  try {
    const place = await PlacesModel.findByIdAndDelete(req.params.id).exec();
    if (!place) {
      // If the document doesn't exist, return an appropriate response
      return res.status(404).send("Place not found");
    }
    // If the document is successfully deleted, return a success message or appropriate response
    return res.send("Place deleted successfully");
  } catch (err) {
    return res.status(500).send(err);
  }
});


export {router as placesRouter};