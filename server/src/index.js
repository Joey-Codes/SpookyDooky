import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import passport from 'passport';
import jwt from 'jsonwebtoken';
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
    resave: false,
    saveUninitialized: false,
    cookie: {
      path: '/',
      httpOnly: true,
      secure: 'false',
      sameSite: 'lax',
    },
  })
);


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

        const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET)
        done(null, { newUser, token });
      } catch (error) {
        console.log(error);
        done(error, null);
      }
    }
  )
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(async (user, done) => {
  console.log("Serialize called")
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
    successRedirect: '/home',   
    failureRedirect: '/login', 
  }),
/*   (req, res) => {
    const { token } = req.user;
    res.cookie('access_token', token, {
      path: '/',
      sameSite: 'none',
    });
    res.redirect('http://localhost:3000');
  } */
);

app.get('/home', (req, res) => {
  res.redirect('http://localhost:3000');
});

app.get('/auth/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: 'An error occurred' });
      }

      res.clearCookie('connect.sid');
      return res.sendStatus(200);
    });
  });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/auth', userRouter);
app.use('/places', placesRouter);
app.use('/reviews', reviewsRouter);

mongoose.connect(`mongodb+srv://admin:${password}@data.emedzou.mongodb.net/Data?retryWrites=true&w=majority`);

app.listen(3001, () => console.log('SERVER STARTED!'));
