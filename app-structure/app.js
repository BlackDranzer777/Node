const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');


//routes
const adminRoutes = require('./routes/admin');


const app = express();

app.use(adminRoutes);

app.listen(3000);