const {QueryTypes} = require('sequelize');
// const Customer = require('../../models/user/customer');
const Restaurant = require('../../models/user/restaurant');
const sequelize = require('../../util/database');
const {v4 : uuidv4} = require('uuid');

exports.postCreateRestaurant = (req,res,next) => {
    const restaurant_id = uuidv4();
    const restaurant_name = req.body.restaurant_name;
    const user_id = req.body.user_id;
    Restaurant.create({
        restaurant_id : restaurant_id,
        restaurant_name : restaurant_name,
        user_id : user_id
    }).then(success => {
        console.log("Restaurant Created successfully");
        return res.json({message : "Success : Restaurant created successfully"});
    }).catch(err => {
        console.log(err);
        return res.json({message : "Error : In creating restaurant"});
    });
}

exports.postUpdateRestaurant = (req,res,next) => {
    console.log("API hit for restaurant");
    const restaurant_id  = req.body.restaurant_id;
    const restaurant_name = req.body.restaurant_name;
    Restaurant.update({
        restaurant_name : restaurant_name
    },{
        where : {restaurant_id : restaurant_id}
    }).then(success => {
        console.log(success);
        return res.json({message : "Success : In updating Restaurant"});
    }).catch(err => {
        console.log(err);
        return res.json({message : "Error : In updating restaurant"});
    });
}

exports.postReadRestaurant = (req, res, next) => {
    const user_id = req.body.user_id;
    Restaurant.findAll({
        where : {
            user_id : user_id
        }
    }).then(success => {
        console.log("Success : In fetching Data");
        return res.json(success);
    }).catch(err => {
        console.log("Error : In fetching Data");
        return res.json({message : "Error : In fetching Data"});
    });
}

exports.postDeleteRestaurant = (req, res, next) => {
    const restaurant_id = req.params.restaurant_id;
    Restaurant.destroy({
        where : {
            restaurant_id : restaurant_id 
        }
    }).then(success => {
        console.log("Success : In deleting restaurant");
        return res.json({message : "Success : In deleting restaurant"});
    }).catch(err => {
        console.log("Error : In deleting restaurant");
        return res.json({message : "Error : In deleting restaurant"});
    });
}