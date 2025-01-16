const sequelize= require('../config/database');
const User = require('./User');
const Category = require('./Category');
const { DataTypes} = require('sequelize');

const Ad = sequelize.define('Ad', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Category,
            key: 'id',
        },
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    isSold: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    timestamps: true,
});

Ad.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
Ad.belongsTo(Category, { foreignKey: 'categoryId', onDelete: 'SET NULL' });

module.exports = Ad;
