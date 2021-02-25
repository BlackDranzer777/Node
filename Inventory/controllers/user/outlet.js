const {QueryTypes} = require('sequelize');
// const Customer = require('../../models/user/customer');
const Outlet = require('../../models/user/outlet');
const sequelize = require('../../util/database');
const {v4 : uuidv4} = require('uuid');

exports.postCreateOutlet = (req,res,next) => {
    const outlet_id = uuidv4();
    const outlet_name = req.body.outlet_name;
    const outlet_location = req.body.outlet_location;
    const restaurant_id = req.body.restaurant_id;
    Outlet.create({
        outlet_id : outlet_id,
        outlet_name : outlet_name,
        outlet_location : outlet_location,
        restaurant_id : restaurant_id
    }).then(success => {
        console.log("Outlet Created successfully");
        return res.json({message : "Success : Outlet created successfully"});
    }).catch(err => {
        console.log(err);
        return res.json({message : "Error : In creating Outlet"});
    });
}

exports.postUpdateOutlet = (req,res,next) => {
    // console.log("API hit for restaurant");
    const outlet_id  = req.body.outlet_id;
    const outlet_name = req.body.outlet_name;
    const outlet_location = req.body.outlet_location;
    Outlet.update({
        outlet_name : outlet_name,
        outlet_location : outlet_location
    },{
        where : {outlet_id : outlet_id}
    }).then(success => {
        console.log(success);
        return res.json({message : "Success : In updating outlet"});
    }).catch(err => {
        console.log(err);
        return res.json({message : "Error : In updating outlet"});
    });
}

exports.postReadOutlet = (req, res, next) => {
    const restaurant_id = req.body.restaurant_id;
    Outlet.findAll({
        where : {
            restaurant_id : restaurant_id
        }
    }).then(success => {
        console.log("Success : In fetching outlet");
        return res.json(success);
    }).catch(err => {
        console.log("Error : In fetching outlet");
        return res.json({message : "Error : In fetching Data"});
    });
}

exports.deleteDeleteOutlet = (req, res, next) => {
    const outlet_id = req.params.outlet_id;
    Outlet.destroy({
        where : {
            outlet_id : outlet_id 
        }
    }).then(success => {
        console.log("Success : In deleting restaurant");
        return res.json({message : "Success : In deleting restaurant"});
    }).catch(err => {
        console.log("Error : In deleting restaurant");
        return res.json({message : "Error : In deleting restaurant"});
    });
}