import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import { placesRouter } from './routes/places.js';
import { userRouter } from './routes/users.js';
import { reviewsRouter } from './routes/reviews.js';

dotenv.config();

const app = express();
const password = process.env.MONGODB_PASSWORD;

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/places", placesRouter);
app.use("/reviews", reviewsRouter);

mongoose.connect(`mongodb+srv://admin:${password}@data.emedzou.mongodb.net/Data?retryWrites=true&w=majority`);

app.listen(3001, () => console.log("SERVER STARTED!"));