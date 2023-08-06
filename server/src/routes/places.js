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
      ]
    });
    res.json(response);
  } catch(err) {
    res.json(err);
  }
});

/* Retrieve all Places sorted by filter */
router.get("/sorted/:filter", async (req, res) => {
  try {
    const { filter } = req.params;
    let sortCondition;
  
    switch (filter) {
      case 'toprated':
        sortCondition = { rating: -1 };
        break;
      case 'lowestrated':
        sortCondition = { rating: 1 };
        break;
      case 'mostreviewed':
        sortCondition = { numRatings: -1 };
        break;
      case 'recentlyadded':
        sortCondition = { createdAt: -1 };
        break;
      default:
        sortCondition = { rating: -1 };
        break;
    }
  
    const places = await PlacesModel.find().sort(sortCondition);
    res.json(places);
  } catch (err) {
    res.status(500).send(err);
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
        case 'newest':
          sortCondition = { createdAt: -1 };
          break;
        case 'oldest':
          sortCondition = { createdAt: 1 };
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


// Find Place given placeId
router.get('/find/:placeId', async (req, res) => {
  try {
    const placeId = req.params.placeId;
    const place = await PlacesModel.findById(placeId);

    if (!place) {
      return res.status(404).json({ message: 'Place not found' });
    }

    // Return only the name value of the place
    res.status(200).json({ name: place.name });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
});

  /* Delete Place by ID */
  router.delete("/delete/:id", async (req, res) => {
  try {
    const place = await PlacesModel.findByIdAndDelete(req.params.id).exec();
    if (!place) {
      return res.status(404).send("Place not found");
    }
    return res.send("Place deleted successfully");
  } catch (err) {
    return res.status(500).send(err);
  }
});


export {router as placesRouter};