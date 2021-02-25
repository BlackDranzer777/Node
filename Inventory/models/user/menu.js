const Sequelize = require('sequelize');

const sequelize = require('../../util/database');

const Menu = sequelize.define('menu',{
    item_id : {
        type : Sequelize.STRING,
        allowNull : false,
        primaryKey : true
    },
    item_name : {
        type : Sequelize.STRING,
        allowNull : false
    },
    price : {
        type : Sequelize.STRING, 
    },
    category : {
        type : Sequelize.STRING, 
    },
    nonVeg : {
        type : Sequelize.BOOLEAN
    }

});

module.exports = Menu;