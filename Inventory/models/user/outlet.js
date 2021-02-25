const Sequelize = require('sequelize');

const sequelize = require('../../util/database');

const Outlet = sequelize.define('outlet',{
    outlet_id : {
        type : Sequelize.STRING,
        allowNull : false,
        primaryKey : true
    },
    outlet_name : {
        type : Sequelize.STRING,
        isUnique : true,
        allowNull : false
    },
    outlet_location : {
        type : Sequelize.STRING, 
    }

});

module.exports = Outlet;