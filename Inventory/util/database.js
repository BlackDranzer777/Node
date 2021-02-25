const Sequelize = require('sequelize');
// const mysql2 = require('mysql2');



const sequelize = new Sequelize('inventory_test', 'root', 'mysql', {
    dialect : 'mysql',
    host : '127.0.0.1',
    port : 3306,
});



module.exports = sequelize;