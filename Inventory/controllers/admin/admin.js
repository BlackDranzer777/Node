const {QueryTypes} = require('sequelize');
const Customer = require('../../models/user/customer');
const Menu = require('../../models/user/menu');
const sequelize = require('../../util/database');
// const mysql = require('mysql2');

// let connection = mysql.createConnection({
//     host: '127.0.0.1',
//     user: 'soft',
//     password: '',
//     database: 'inventory_test',
//     port : 3306
// });


exports.getFoodItem = (req, res, next) => {
    var fooditem = "select * from food item";
    // const users = sequelize.query("insert into customers(name,email) values('afd','fdsfsd')", { type: QueryTypes.SELECT });
    // Menu.findAll().then(item => {
    //     console.log(item);
    //     res.send(item);
    // });
    // const customer = Customer.findAll();
    // res.json(fooditem);
    console.log("API getFoodItem hit")
};
