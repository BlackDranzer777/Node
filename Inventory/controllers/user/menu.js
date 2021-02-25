const {QueryTypes} = require('sequelize');
// const Customer = require('../../models/user/customer');
const Menu = require('../../models/user/menu');
const sequelize = require('../../util/database');
const {v4 : uuidv4} = require('uuid');

exports.postNewItem = (req, res, next) => {
    console.log("API NewItem hit");
    const item_id = uuidv4();
    const item_name = req.body.item_name;
    const price = req.body.price;
    const category = req.body.category;
    const nonVeg = req.body.nonVeg;
    const outlet_id = req.body.outlet_id;
    console.log("req.body ===> ",req.body);
    Menu.create({
        item_id : item_id,
        item_name : item_name,
        price : price,
        category : category,
        nonVeg : nonVeg,
        outlet_id : outlet_id
    }).then(result => {
        return res.json({message : "new item created"});
    }).catch(err => {
        console.log(err);
        return res.json({message : "error in creating new item"});
    })
}

exports.fetchMenu = (req, res, next) => {
    // console.log(req.params);
    const outlet_id = req.body.outlet_id;
    Menu.findAll({
        where : { outlet_id : outlet_id}
    }).then(result => {
        if(result == null) return res.json({message : "Menu not found for this outlet"})
        else return res.json(result);
    }).catch(err => {
        return res.json({message : "Error in fetching menu for this particular restaurant id"});
    });
}

exports.updateNewItem = (req, res, next) => {
    const item_id = req.body.item_id;
    const item_name = req.body.item_name;
    const price = req.body.price;
    const category = req.body.category;
    // const outlet_id = req.body.outlet_id;
    Menu.update({
        item_name : item_name,
        price : price,
        category : category
        // outlet_id : outlet_id
    },{
        where : { item_id : item_id}
    }).then(result => {
        console.log(result);
        if(result == null) return res.json({message : "Menu not found for this outlet"})
        else return res.json({message : "Menu item updated"});
    }).catch(err => {
        console.log(err);
        return res.json({message : "Error in fetching menu for this particular restaurant id"});
    });
}

exports.deleteItem = (req, res, next) => {
    const item_id = req.params.item_id;
    console.log("item_id ==>",item_id);
    Menu.destroy({
        where : {item_id : item_id}
    }).then(result => {
        console.log(result);
        if(result == 0) return res.json({message : "Error: In deleting item"});
        else return res.json({message : "item deleted successfully"});
    }).catch(err => {
        console.log(err);
        return res.json({message : "Problem in deleted item"});
    })
}

// exports.getFoodItem = (req, res, next) => {
//     var fooditem = "select * from food item";
//     // const users = sequelize.query("insert into customers(name,email) values('afd','fdsfsd')", { type: QueryTypes.SELECT });
//     Menu.findAll().then(item => {
//         console.log(item);
//         res.send(item);
//     });
//     // const customer = Customer.findAll();
//     // res.json(fooditem);
// };
