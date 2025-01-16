const sequelize = require('../config/database');
const User = require('./User');
const Ad = require('./Ad');
const { DataTypes} = require('sequelize');

const Message = sequelize.define('Message', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    senderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },
    receiverId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },
    adId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Ad,
            key: 'id',
        },
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
}, {
    timestamps: true,
});

Message.belongsTo(User, { as: 'sender', foreignKey: 'senderId', onDelete: 'CASCADE' });
Message.belongsTo(User, { as: 'receiver', foreignKey: 'receiverId', onDelete: 'CASCADE' });
Message.belongsTo(Ad, { foreignKey: 'adId', onDelete: 'CASCADE' });

module.exports = Message;
