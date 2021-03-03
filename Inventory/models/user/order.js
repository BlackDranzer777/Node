const Sequelize = require('sequelize');

const sequelize = require('../../util/database');

const Order = sequelize.define('order',{
    order_id : {
        type : Sequelize.INTEGER,
        autoIncrement : true,
        allowNull : false,
        primaryKey : true
    },
    item_name : {
        type : Sequelize.STRING,
        allowNull : false
    },
    quantity : {
        type : Sequelize.INTEGER
    }

});

module.exports = Order;