const Sequelize = require('sequelize');

const sequelize = require('../../util/database');

const Restaurant = sequelize.define('restaurant',{
    restaurant_id : {
        type : Sequelize.STRING,
        allowNull : false,
        primaryKey : true
    },
    restaurant_name : {
        type : Sequelize.STRING,
        isUnique : true,
        allowNull : false
    }

});

module.exports = Restaurant;