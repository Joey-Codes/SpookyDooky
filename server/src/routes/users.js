import express from "express";
import jwt from 'jsonwebtoken';
import passport from "passport";


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
  