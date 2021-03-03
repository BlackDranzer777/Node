const {QueryTypes} = require('sequelize');
// const Customer = require('../../models/user/customer');
const Order = require('../../models/user/customer');
const sequelize = require('../../util/database');
const {v4 : uuidv4} = require('uuid');

exports.postNewOrder = (req, res, next) => {
    console.log("API NewOrder hit");
    const order_id = uuidv4();
    const item_name = req.body.item_name;
    const quantity = req.body.quantity;
    const employee_id = req.body.employee_id;
    const customer_id = req.body.customer_id;
    const outlet_id = req.body.outlet_id;
    console.log("req.body ===> ",req.body);
    Order.create({
        order_id : order_id,
        item_name : item_name,
        quantity : quantity,
        employee_id : employee_id,
        customer_id : customer_id,
        outlet_id : outlet_id
    }).then(result => {
        return res.json({message : "Order has been added"});
    }).catch(err => {
        console.log(err);
        return res.json({message : "Error while creating new order"});
    });
}

exports.postFetchOrderByOutlet = (req, res, next) => {
    // console.log(req.params);
    const outlet_id = req.params.outlet_id;
    Order.findAll({
        where : { outlet_id : outlet_id}
    }).then(result => {
        if(result == null) return res.json({message : "Order not found for this outlet"})
        else return res.json(result);
    }).catch(err => {
        return res.json({message : "Error in fetching Order"});
    });
}

exports.postFetchOrderByCustomerID = (req, res, next) => {
    // console.log(req.params);
    const customer_id = req.params.customer_id;
    Order.findAll({
        where : { customer_id : customer_id}
    }).then(result => {
        if(result == null) return res.json({message : "Order not found for this outlet"})
        else return res.json(result);
    }).catch(err => {
        return res.json({message : "Error in fetching order"});
    });
}

exports.postFetchOrderByOrderID = (req, res, next) => {
    // console.log(req.params);
    const order_id = req.params.order_id;
    Order.findAll({
        where : { order_id : order_id}
    }).then(result => {
        if(result == null) return res.json({message : "Order not found for this outlet"})
        else return res.json(result);
    }).catch(err => {
        return res.json({message : "Error in fetching order"});
    });
}

exports.postUpdateOrder = (req, res, next) => {
    const item_name = req.body.item_name;
    const quantity = req.body.quantity;
    const order_id = req.body.order_id;
    Order.update({
        item_name : item_name,
        quantity : quantity
        // outlet_id : outlet_id
    },{
        where : { order_id : order_id}
    }).then(result => {
        console.log(result);
        if(result == null) return res.json({message : "Order not found for this outlet"})
        else return res.json({message : "Order details updated"});
    }).catch(err => {
        console.log(err);
        return res.json({message : "Error in fetching Order Information for this particular Order Id"});
    });
}

exports.deleteDeleteOrder = (req, res, next) => {
    const order_id = req.params.order_id;
    console.log("Order_id ==>",employee_id);
    Customer.destroy({
        where : {order_id : order_id}
    }).then(result => {
        console.log(result);
        if(result == 0) return res.json({message : "Error: In deleting Order"});
        else return res.json({message : "Order has been deleted successfully"});
    }).catch(err => {
        console.log(err);
        return res.json({message : "Error while deleting order"});
    })
}


