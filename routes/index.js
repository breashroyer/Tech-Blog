// routes/index.js

const express = require('express');
const router = express.Router();

// Import your controller functions
const dashboardController = require('../controllers/dashboardController');
const loginController = require('../controllers/loginController');
const registerController = require('../controllers/registerController');

// Route handler for rendering the dashboard template
router.get('/dashboard', dashboardController.renderDashboard);

// Route handler for rendering the login template
router.get('/login', loginController.renderLogin);

// Route handler for rendering the register template
router.get('/register', registerController.renderRegister);

module.exports = router;


