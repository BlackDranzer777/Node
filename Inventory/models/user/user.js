const Sequelize = require('sequelize');

const sequelize = require('../../util/database');

const User = sequelize.define('user',{
    user_id : {
        type : Sequelize.DataTypes.UUID,
        allowNull : false,
        primaryKey : true
    },
    name : {
        type : Sequelize.STRING,
        allowNull : false
    },

    email : {
        type : Sequelize.STRING,
        isUnique : true,
        validate : {
            isEmail : true
        },
        allowNull : false
    },
    password : {
        type : Sequelize.STRING,
        allowNull : false
    },
    phone_number : {
        type : Sequelize.STRING,
        isUnique : true,
        allowNull : false
    },
    age : {
        type : Sequelize.INTEGER,
        allowNull : false
    },
    status : {
        type : Sequelize.STRING,
        validate : {
            isIn : [['Active', 'InActive']]
        },
        allowNull : false
    },
    token : {
        type: Sequelize.STRING,
        isUnique : true
    }

});

module.exports = User;