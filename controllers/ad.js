const { Op } = require('sequelize');
const User = require('../models/User');
const Category = require('../models/Category');
const Ad = require('../models/Ad');

// Ваш список категорий (ID -> название)
const categoriesSeed = {
    1: "Electronic Devices",
    2: "Home Appliances",
    3: "Furniture",
    4: "Clothing",
    5: "Footwear",
    6: "Books",
    7: "Toys",
    8: "Sports Equipment",
    9: "Automotive",
    10: "Gardening"
};

exports.createAd = async (req, res) => {
    try {
        const { title, description, categoryId, price } = req.body;
        const userId = req.user.userId;

        // 1. Проверяем, есть ли такая категория в базе
        let category = await Category.findByPk(categoryId);

        // 2. Если нет, но есть в нашем categoriesSeed, тогда создаём
        if (!category && categoriesSeed[categoryId]) {
            category = await Category.create({
                id: categoryId,
                name: categoriesSeed[categoryId]
            });
        }

        // Если категория всё ещё null ― значит это либо
        //    - categoryId не совпадает ни с одним ключом в categoriesSeed,
        //    - или categoryId < 1 / > 10
        // Тогда возвращаем ошибку
        if (!category) {
            return res.status(400).json({
                message: `Category with id ${categoryId} is not allowed (or unknown in 'categoriesSeed')`
            });
        }

        // 3. Создаём объявление
        const ad = await Ad.create({
            userId,
            title,
            description,
            categoryId,
            price,
        });

        // 4. Дополнительно подгружаем связанные данные
        const fullAd = await Ad.findByPk(ad.id, {
            include: [
                { model: User, attributes: ['id', 'username', 'email'] },
                { model: Category, attributes: ['id', 'name'] }
            ]
        });

        res.status(201).json({ message: 'Ad created successfully', ad: fullAd });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create ad', error });
    }
};

exports.getUserAds = async (req, res) => {
    try {
        const userId = req.user.userId;

        const ads = await Ad.findAll({
            where: { userId },
            include: [{ model: Category, attributes: ['id', 'name'] }]
        });
        res.status(200).json(ads);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch ads', error });
    }
};

exports.searchAds = async (req, res) => {
    try {
        const { title, categoryId, minPrice, maxPrice, sortBy } = req.query;

        let filters = {};
        if (title) filters.title = { [Op.like]: `%${title}%` };
        if (categoryId) filters.categoryId = categoryId;
        if (minPrice) filters.price = { [Op.gte]: minPrice };
        if (maxPrice) filters.price = { ...filters.price, [Op.lte]: maxPrice };

        let order = [];
        if (sortBy === 'priceAsc') order.push(['price', 'ASC']);
        else if (sortBy === 'priceDesc') order.push(['price', 'DESC']);
        else order.push(['createdAt', 'DESC']);

        const ads = await Ad.findAll({
            where: filters,
            order: order,
            include: [
                { model: User, attributes: ['id', 'username'] },
                { model: Category, attributes: ['id', 'name'] }
            ]
        });

        res.status(200).json(ads);
    } catch (error) {
        res.status(500).json({ message: 'Failed to search ads', error });
    }
};

exports.updateAd = async (req, res) => {
    try {
        const adId = req.params.id;
        const userId = req.user.userId;
        const { title, description, categoryId, price } = req.body;

        const ad = await Ad.findOne({ where: { id: adId, userId } });
        if (!ad) {
            return res.status(404).json({ message: 'Ad not found or you are not the owner' });
        }

        await ad.update({ title, description, categoryId, price });
        res.status(200).json({ message: 'Ad updated successfully', ad });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update ad', error });
    }
};

exports.deleteAd = async (req, res) => {
    try {
        const adId = req.params.id;
        const userId = req.user.userId;

        const ad = await Ad.findOne({ where: { id: adId, userId } });
        if (!ad) {
            return res.status(404).json({ message: 'Ad not found or you are not the owner' });
        }

        await ad.destroy();
        res.status(200).json({ message: 'Ad deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete ad', error });
    }
};

exports.markAsSold = async (req, res) => {
    try {
        const adId = req.params.id;
        const userId = req.user.userId;

        const ad = await Ad.findOne({ where: { id: adId, userId } });
        if (!ad) {
            return res.status(404).json({ message: 'Ad not found or you are not the owner' });
        }

        await ad.update({ isSold: true });
        res.status(200).json({ message: 'Ad marked as sold', ad });
    } catch (error) {
        res.status(500).json({ message: 'Failed to mark ad as sold', error });
    }
};

exports.getAllAds = async (req, res) => {
    try {
        const ads = await Ad.findAll({
            include: [
                { model: User, attributes: ['id', 'username'] },
                { model: Category, attributes: ['id', 'name'] }
            ]
        });
        res.status(200).json(ads);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch ads', error });
    }
};

exports.getAdsByUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const ads = await Ad.findAll({
            where: { userId },
            include: [{ model: Category, attributes: ['id', 'name'] }]
        });
        if (!ads.length) {
            return res.status(404).json({ message: 'No ads found for this user' });
        }
        res.status(200).json(ads);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch user ads', error });
    }
};
