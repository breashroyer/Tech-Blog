const router = require('express').Router();
const { User } = require('../../models');

// Route to register a new user
router.post('/register', async (req, res) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    // Set up session information
    req.session.save(() => {
      req.session.userId = newUser.id; // Corrected to newUser
      req.session.username = newUser.username; // Optionally save other user info
      req.session.loggedIn = true;

      res.status(200).json({ user: newUser, message: 'Registration successful and logged in!' });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to log in a user
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });
    if (!userData) {
      res.status(400).json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = userData.checkPassword(req.body.password);
    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // Set up session information upon successful login
    req.session.save(() => {
      req.session.userId = userData.id;
      req.session.username = userData.username;
      req.session.loggedIn = true;

      res.json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

  