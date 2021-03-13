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
        isUnique : true,
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
    category : {
        type : Sequelize.STRING,
        isUnique : true,
        allowNull : false,
        validate : {
            isIn : [['chef','server']]
        }
    }

});

module.exports = Employee;