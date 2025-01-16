const sequelize = require('../config/database');
const { DataTypes} = require('sequelize');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [8, 100],
        },
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [3, 20],
        },
    },
}, {
    timestamps: true,
});

module.exports = User;
