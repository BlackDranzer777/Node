const Sequelize = require('sequelize');

const sequelize = require('../../util/database');

const Inventory = sequelize.define('inventory',{
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
    }

    }
});

module.exports = Inventory;