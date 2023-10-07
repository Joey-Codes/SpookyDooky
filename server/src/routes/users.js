import express from "express";
import jwt from 'jsonwebtoken';
import passport from "passport";
import { UserModel } from "../models/Users.js";
import { SecretManagerServiceClient } from '@google-cloud/secret-manager';

async function accessSecret(secretName) {
  const client = new SecretManagerServiceClient();
  const [version] = await client.accessSecretVersion({
    name: secretName,
  });

  return version.payload.data.toString();
}

const jwtSecret = await accessSecret('projects/904458328495/secrets/JWT_SECRET/versions/latest');
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
    const token = jwt.sign({ id: req.user._id }, jwtSecret);
    res.redirect(`https://spookydooky.net//?token=${token}`);
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

router.delete("/delete/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    // Use the findByIdAndDelete method to remove the user by ID
    const deletedUser = await UserModel.findByIdAndDelete(userId);

    if (!deletedUser) {
      // If the user with the given ID doesn't exist, return a 404 response
      return res.status(404).json({ message: "User not found" });
    }

    // Return a success message with the deleted user data
    res.json({ message: "User deleted successfully", deletedUser });
  } catch (err) {
    // If there's an error, handle it and send a 500 response
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});


router.get("/verifytoken/:token", (req, res) =>  {
  const token = req.params.token;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
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
      const decoded = jwt.verify(token, jwtSecret);
      req.userId = decoded.id;
      next();
    } catch (error) {
      return res.status(403).json({ message: 'Invalid token' });
    }
  };
  