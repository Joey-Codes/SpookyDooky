import express from "express";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserModel } from "../models/Users.js";
import passport from "passport";
const router = express.Router();

/* router.post("/register", async (req, res) => {
    const { username, password} = req.body;
    const user = await UserModel.findOne({ username });

    if (user) {
        return res.json({ message: "User already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new UserModel({ username, password: hashedPassword });
    await newUser.save();

    res.json({ message: "User Registered Successfully!" });
});
 */


/* router.post("/login", async (req, res) => {
    const { username, password} = req.body;
    const user = await UserModel.findOne({ username });

    if (!user) {
        return res.json({ message: "User does not exist!" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        res.json({ message: "Username or Password is incorrect! "});
    }

    const token = jwt.sign({id: user._id}, "secret");
    res.json({ token, userID: user._id });

}); */


/* Redirect to Google Sign-in Page */
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

/* Google callback route */
router.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/success',
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
  