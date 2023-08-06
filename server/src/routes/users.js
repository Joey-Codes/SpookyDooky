import express from "express";
import jwt from 'jsonwebtoken';
import passport from "passport";
import { UserModel } from "../models/Users.js";

const router = express.Router();

/* Redirect to Google Sign-in Page */
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

/* Google callback route */
router.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: '/auth/success',
    failureRedirect: '/login',
  })
);

/* Upon success */
router.get('/success', (req, res) => {
  try {
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET);
    res.redirect(`http://localhost:3000/?token=${token}`);
  } catch (error) {
    console.log(error);
    res.redirect('/login');
  }
});

/* User logout */
router.get('/logout', (req, res) => {
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

/* Given review's userId retrieve the user's name */
router.get('/find/:userId', async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId, { name: 1, _id: 0 });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Split the full name into an array of first name and last name
    const fullName = user.name.split(' ');
    let firstName = fullName[0];
    let lastName = '';
    
    // If there's more than one word, take the first letter of the second word as the last initial
    if (fullName.length > 1) {
      lastName = fullName[1].charAt(0).toUpperCase() + '.';
    }

    // Combine the first name and last initial to get "Bob S."
    const name = `${firstName} ${lastName}`;

    // Send the modified data in the response
    res.json({ name });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});


router.get("/verifytoken", (req, res) =>  {
  const token = req.cookies.jwtToken;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    return res.status(200).json({ userId });
  } catch (err) {
    return res.status(403).json({ message: 'Invalid token' });
  }
});

export {router as userRouter };

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
  
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decoded.id;
      next();
    } catch (error) {
      return res.status(403).json({ message: 'Invalid token' });
    }
  };
  