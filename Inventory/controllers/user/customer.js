const {QueryTypes} = require('sequelize');
const Customer = require('../../models/user/customer');
const Menu = require('../../models/user/menu');
const sequelize = require('../../util/database');

exports.getFoodItem = (req, res, next) => {
    var fooditem = "select * from food item";
    // const users = sequelize.query("insert into customers(name,email) values('afd','fdsfsd')", { type: QueryTypes.SELECT });
    // Menu.findAll().then(item => {
    //     console.log(item);
    //     res.send(item);
    // });
    // const customer = Customer.findAll();
    // res.json(fooditem);
    console.log("API getFoodItem executed");
};
