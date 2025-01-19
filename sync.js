const sequelize = require('./config/database');
require('dotenv').config();

// Подключаем модели вручную
require('./models/User');
require('./models/Category');
require('./models/Ad');
require('./models/Message');

const forceSync = process.env.DB_FORCE_SYNC === 'true';

async function syncModels() {
    try {
        await sequelize.sync({ force: forceSync });
        console.log(`All models were synchronized successfully${forceSync ? ' with force' : ''}.`);
    } catch (error) {
        console.error('Error synchronizing models:', error);
    } finally {
        await sequelize.close();
        console.log('Database connection closed.');
    }
}

syncModels();
