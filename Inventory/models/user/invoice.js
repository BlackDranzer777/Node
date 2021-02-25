const Sequelize = require('sequelize');

const sequelize = require('../../util/database');

const Invoice = sequelize.define('invoice',{
    id : {
        type : Sequelize.INTEGER,
        autoIncrement : true,
        allowNull : false,
        primaryKey : true
    },
    name : {
        type : Sequelize.STRING,
        isUnique : true,
        allowNull : false
    },
    email : {
        type : Sequelize.STRING,
        isUnique : true,
        validate : {
            isEmail : true
        },
    phone_number : {
        type : Sequelize.STRING,
        isUnique : true,
        allowNull : false
    },
    category : {
        type : Sequelize.STRING,
        isUnique : true,
        allowNull : false,
        validate : {
            isIn : [['swiggy','zomato','customer']]
        }
    }

    }
});

module.exports = Invoice;