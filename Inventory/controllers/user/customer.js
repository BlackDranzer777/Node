const {QueryTypes} = require('sequelize');
// const Customer = require('../../models/user/customer');
const Customer = require('../../models/user/customer');
const sequelize = require('../../util/database');
const {v4 : uuidv4} = require('uuid');

exports.postNewCustomer = (req, res, next) => {
    console.log("API NewItem hit");
    const customer_id = uuidv4();
    const customer_name = req.body.customer_name;
    const customer_phone = req.body.customer_phone;
    const customer_email = req.body.customer_email;
    const customer_category = req.body.customer_category;
    const outlet_id = req.body.outlet_id;
    console.log("req.body ===> ",req.body);
    Customer.create({
        customer_id : customer_id,
        customer_name : customer_name,
        customer_email : customer_email,
        customer_phone : customer_phone,
        customer_category : customer_category,
        outlet_id : outlet_id
    }).then(result => {
        return res.json({message : "Employee has been added"});
    }).catch(err => {
        console.log(err);
        return res.json({message : "Error while creating new Employee"});
    });
}

exports.postFetchCustomerByOutlet = (req, res, next) => {
    // console.log(req.params);
    const outlet_id = req.params.outlet_id;
    Customer.findAll({
        where : { outlet_id : outlet_id}
    }).then(result => {
        if(result == null) return res.json({message : "Employee not found for this outlet"})
        else return res.json(result);
    }).catch(err => {
        return res.json({message : "Error in fetching new employee"});
    });
}

exports.postFetchCustomerByCustomerID = (req, res, next) => {
    // console.log(req.params);
    const customer_id = req.params.customer_id;
    Customer.findAll({
        where : { customer_id : customer_id}
    }).then(result => {
        if(result == null) return res.json({message : "Employee not found for this outlet"})
        else return res.json(result);
    }).catch(err => {
        return res.json({message : "Error in fetching new employee"});
    });
}

exports.postUpdateCustomer = (req, res, next) => {
    const customer_phone = req.body.customer_phone;
    const customer_category = req.body.customer_category;
    const customer_id = req.body.customer_id;
    Customer.update({
        customer_phone : customer_phone,
        customer_category : customer_category
        // outlet_id : outlet_id
    },{
        where : { customer_id : customer_id}
    }).then(result => {
        console.log(result);
        if(result == null) return res.json({message : "Employee not found for this outlet"})
        else return res.json({message : "Employee details updated"});
    }).catch(err => {
        console.log(err);
        return res.json({message : "Error in fetching Employee Information for this particular Employee Id"});
    });
}

exports.deleteDeleteCustomer = (req, res, next) => {
    const customer_id = req.params.customer_id;
    console.log("Employee_id ==>",employee_id);
    Customer.destroy({
        where : {customer_id : customer_id}
    }).then(result => {
        console.log(result);
        if(result == 0) return res.json({message : "Error: In deleting Employee information"});
        else return res.json({message : "Employee info has been deleted successfully"});
    }).catch(err => {
        console.log(err);
        return res.json({message : "Error while deleting employee"});
    })
}


