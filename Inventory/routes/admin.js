const express = require('express');
const path = require('path');

//Router
const router = express.Router();

//Controller
const adminController = require('../controllers/admin/admin');


//Get Request
router.get('/', adminController.getFoodItem);

module.exports = router;