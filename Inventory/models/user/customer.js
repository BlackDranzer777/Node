const Sequelize = require('sequelize');

const sequelize = require('../../util/database');

const Customer = sequelize.define('customer',{
    customer_id : {
        type : Sequelize.DataTypes.UUID,
        allowNull : false,
        primaryKey : true
    },
    customer_name : {
        type : Sequelize.STRING,
        isUnique : true,
    },
    customer_email : {
        type : Sequelize.STRING,
        isUnique : true,
        validate : {
            isEmail : true
        },
        allowNull : true
    },
    customer_phone : {
        type : Sequelize.STRING,
        isUnique : true,
        allowNull : true
    },
    customer_category : {
        type : Sequelize.STRING,
        isUnique : true,
        allowNull : false,
        validate : {
            isIn : [['swiggy','zomato','customer']]
        }
    }
});

module.exports = Customer;