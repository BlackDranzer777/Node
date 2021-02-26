const {QueryTypes} = require('sequelize');
// const Customer = require('../../models/user/customer');
const Employee = require('../../models/user/employee');
const sequelize = require('../../util/database');
const {v4 : uuidv4} = require('uuid');

exports.postNewEmployee = (req, res, next) => {
    console.log("API NewItem hit");
    const employee_id = uuidv4();
    const employee_name = req.body.employee_name;
    const phone = req.body.phone;
    const age = req.body.age;
    const gender = req.body.gender;
    const employee_dob = req.body.employee_dob;
    const category = req.body.category;
    const outlet_id = req.body.outlet_id;
    console.log("req.body ===> ",req.body);
    Employee.create({
        employee_id : employee_id,
        employee_name : employee_name,
        phone : phone,
        age : age,
        gender : gender,
        employee_dob : employee_dob,
        category : category,
        outlet_id : outlet_id
    }).then(result => {
        return res.json({message : "Employee has been added"});
    }).catch(err => {
        console.log(err);
        return res.json({message : "Error while creating new Employee"});
    })
}

exports.postFetchEmployee = (req, res, next) => {
    // console.log(req.params);
    const outlet_id = req.body.outlet_id;
    Employee.findAll({
        where : { outlet_id : outlet_id}
    }).then(result => {
        if(result == null) return res.json({message : "Employee not found for this outlet"})
        else return res.json(result);
    }).catch(err => {
        return res.json({message : "Error in fetching new employee"});
    });
}

exports.postUpdateEmployee = (req, res, next) => {
    const phone = req.body.phone;
    const category = req.body.category;
    const employee_id = req.body.employee_id
    Employee.update({
        phone : phone,
        category : category
        // outlet_id : outlet_id
    },{
        where : { employee_id : employee_id}
    }).then(result => {
        console.log(result);
        if(result == null) return res.json({message : "Employee not found for this outlet"})
        else return res.json({message : "Employee details updated"});
    }).catch(err => {
        console.log(err);
        return res.json({message : "Error in fetching Employee Information for this particular Employee Id"});
    });
}

exports.deleteDeleteEmployee = (req, res, next) => {
    const employee_id = req.params.employee_id;
    console.log("Employee_id ==>",employee_id);
    Employee.destroy({
        where : {employee_id : employee_id}
    }).then(result => {
        console.log(result);
        if(result == 0) return res.json({message : "Error: In deleting Employee information"});
        else return res.json({message : "Employee info has been deleted successfully"});
    }).catch(err => {
        console.log(err);
        return res.json({message : "Error while deleting employee"});
    })
}


