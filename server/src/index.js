import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import session from 'express-session';
import { UserModel } from './models/Users.js';
import { placesRouter } from './routes/places.js';
import { userRouter } from './routes/users.js';
import { reviewsRouter } from './routes/reviews.js';

dotenv.config();

const app = express();
const password = process.env.MONGODB_PASSWORD;

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));


app.use(
  session({
    secret: 'fjaieofjewoifjewfejwiofjoe',
    resave: true,
    saveUninitialized: true,
    cookie: {
      path: '/',
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production', 
    },
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
      passReqToCallback: true,
      debug: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await UserModel.findOne({ profileID: profile.id });

        if (existingUser) {
          return done(null, existingUser);
        }

        const newUser = new UserModel({
          email: profile.emails[0].value,
          name: profile.displayName,
          profileID: profile.id,
        });

        await newUser.save();

        done(null, newUser);
      } catch (error) {
        console.log(error);
        done(error, null);
      }
    }
  )
);

passport.serializeUser(async (user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await UserModel.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/success',
    failureRedirect: '/login',
  })
);

app.get('/success', (req, res) => {
  try {
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET);
    res.redirect(`http://localhost:3000/?token=${token}`);
  } catch (error) {
    console.log(error);
    res.redirect('/login');
  }
});


app.get('/auth/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: 'Failed to log out' });
    } else {
      res.clearCookie('connect.sid');

      res.status(200).json({ message: 'Logged out successfully' });
    }
  });
});

app.use('/auth', userRouter);
app.use('/places', placesRouter);
app.use('/reviews', reviewsRouter);

mongoose.connect(`mongodb+srv://admin:${password}@data.emedzou.mongodb.net/Data?retryWrites=true&w=majority`);

app.listen(3001, () => console.log('SERVER STARTED!'));
