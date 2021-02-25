const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
// ===DB connection===
const sequelize = require('./util/database');

// ===routes===
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');

/* ===models===*/
// const Customer = require('./models/user/customer');
const User = require('./models/user/user');
const Restaurant = require('./models/user/restaurant');
const Menu = require('./models/user/menu');
const Outlet = require('./models/user/outlet');
const Employee = require('./models/user/employee');
const Customer = require('./models/user/customer');
const Order = require('./models/user/order');
// const Invoice = require('./models/user/invoice');

//Body Parser as a middle-ware
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.json());



/* ===Model Defination=== */
User.hasMany(Restaurant, {foreignKey : "user_id"});

Restaurant.hasMany(Outlet, {foreignKey : "restaurant_id"});

Outlet.hasOne(Menu, {foreignKey : 'outlet_id'});

Outlet.hasMany(Employee, {foreignKey : 'outlet_id'});

Outlet.hasMany(Customer, { foreignKey : 'outlet_id'})

Customer.hasMany(Order, {foreignKey : 'customer_id'});

Employee.hasMany(Order, {foreignKey : 'employee_id'});

/* ===Initial Data when app starts=== */
// data = [
//     {id : 1, name: 'otc', price: 200, category: 'pizza'},
//     {id : 2, name: 'margerita', price: 200, category: 'pizza'},
//     {id : 3, name: '7 slice', price: 250, category: 'pizza'},
//     {id : 4, name: 'thin crust', price: 200, category: 'pizza'},
//     {id : 5, name: 'sex on beach', price: 200, category: 'pizza'},
//     {id : 6, name: 'dejuner', price: 200, category: 'pizza'},
// ]

//App Generates data
sequelize.sync({alter : true, force : false}).then(result => {
    console.log("Tables created")
}).catch(err => {
    console.log("Error in loading data");
});



app.use('/admin',adminRoutes);
app.use(userRoutes);

app.listen(3000);