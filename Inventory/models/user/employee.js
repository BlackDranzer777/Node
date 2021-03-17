const Sequelize = require('sequelize');

const sequelize = require('../../util/database');

const Employee = sequelize.define('employee',{
    employee_id : {
        type : Sequelize.STRING,
        allowNull : false,
        primaryKey : true
    },
    employee_name : {
        type : Sequelize.STRING,
        isUnique : false,
        allowNull : false
    },
    employee_username : {
        type : Sequelize.STRING,
        isUnique : true,
        allowNull : false
    },
    password : {
        type : Sequelize.STRING,
        isUnique : false,
        allowNull : false
    },
    phone : {
        type : Sequelize.STRING,
        allowNull : false 
    },
    email : {
        type : Sequelize.STRING
    },
    gender : {
        type: Sequelize.STRING,
        validate : {
            isIn : [['male','female']]
        }
    },
    employee_dob : {
        type : Sequelize.DATE
    },
    employee_address : {
        type : Sequelize.STRING
    },
    role : {
        type : Sequelize.STRING,
        isUnique : true,
        allowNull : false,
        validate : {
            isIn : [['chef','server']]
        }
    },
    status : {
        type : Sequelize.STRING,
        validate : {
            isIn : [['Active', 'InActive']]
        },
        allowNull : false
    },
    token : {
        type: Sequelize.STRING,
        isUnique : true
    }

});

module.exports = Employee;