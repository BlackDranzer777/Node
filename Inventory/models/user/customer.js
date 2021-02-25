const Sequelize = require('sequelize');

const sequelize = require('../../util/database');

const Customer = sequelize.define('customer',{
    customer_id : {
        type : Sequelize.DataTypes.UUID,
        allowNull : false,
        primaryKey : true
    },
    name : {
        type : Sequelize.STRING,
        isUnique : true,
    },
    email : {
        type : Sequelize.STRING,
        isUnique : true,
        validate : {
            isEmail : true
        },
        allowNull : true
    },
    phone_number : {
        type : Sequelize.STRING,
        isUnique : true,
        allowNull : true
    },
    category : {
        type : Sequelize.STRING,
        isUnique : true,
        allowNull : false,
        validate : {
            isIn : [['swiggy','zomato','customer']]
        }
    }
});

module.exports = Customer;
