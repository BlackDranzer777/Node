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
    age : {
        type : Sequelize.INTEGER,
    },
    gender : {
        type: Sequelize.STRING
    },
    employee_dob : {
        type : Sequelize.DATE
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