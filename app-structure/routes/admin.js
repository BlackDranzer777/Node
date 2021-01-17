const express = require('express');
const path = require('path');

//Router
const router = express.Router();

//Controller
const adminController = require('../controllers/admin');


//Get Request
router.get('/', adminController.getHello);

module.exports = router;