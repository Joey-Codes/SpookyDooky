import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import passport from 'passport';
import {v2 as cloudinary } from 'cloudinary';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import { UserModel } from './models/Users.js';
import { placesRouter } from './routes/places.js';
import { userRouter } from './routes/users.js';
import { reviewsRouter } from './routes/reviews.js';
import { SecretManagerServiceClient } from '@google-cloud/secret-manager';

dotenv.config();

const app = express();

async function accessSecret(secretName) {
  const client = new SecretManagerServiceClient();
  const [version] = await client.accessSecretVersion({
    name: secretName,
  });

  return version.payload.data.toString();
}

const mongoPassword = await accessSecret('projects/904458328495/secrets/MONGODB_PASSWORD/versions/latest');
const googleClientId = await accessSecret('projects/904458328495/secrets/GOOGLE_CLIENT_ID/versions/latest');
const googleClientSecret = await accessSecret('projects/904458328495/secrets/GOOGLE_CLIENT_SECRET/versions/latest');
const sessionSecret = await accessSecret('projects/904458328495/secrets/SESSION_SECRET/versions/latest');
const cloudinaryName = await accessSecret('projects/904458328495/secrets/CLOUDINARY_NAME/versions/latest');
const cloudinaryApiKey = await accessSecret('projects/904458328495/secrets/CLOUDINARY_API_KEY/versions/latest');
const cloudinaryApiSecret = await accessSecret('projects/904458328495/secrets/CLOUDINARY_API_SECRET/versions/latest');
const productionBool = await accessSecret('projects/904458328495/secrets/PRODUCTION_BOOL/versions/latest');



app.use(cookieParser());

app.use(cors({
  origin: [
    'https://spooky-dooky-frontend.web.app', 
    'https://spookydooky.net', 
    'https://www.spookydooky.net',    
  ],
  credentials: true,
}));


app.use(
  session({
    secret: sessionSecret,
    resave: true,
    saveUninitialized: true,
    cookie: {
      path: '/',
      httpOnly: true, 
      secure: productionBool === 'true', 
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
      clientID: googleClientId,
      clientSecret: googleClientSecret,
      callbackURL: `https://spooky-dooky-server-gqbpmqhyva-uc.a.run.app/auth/google/callback`,
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

cloudinary.config({ 
  cloud_name: `${cloudinaryName}`, 
  api_key: `${cloudinaryApiKey}`, 
  api_secret: `${cloudinaryApiSecret}` 
});

app.use('/auth', userRouter);
app.use('/places', placesRouter);
app.use('/reviews', reviewsRouter);


mongoose.connect(`mongodb+srv://admin:${mongoPassword}@data.emedzou.mongodb.net/Data?retryWrites=true&w=majority`);

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`SERVER STARTED ON PORT ${port}!`));
