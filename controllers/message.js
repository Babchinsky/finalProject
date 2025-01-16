const { Op } = require('sequelize');
const User = require('../models/User');
const Ad = require('../models/Ad');
const Message = require('../models/Message');

exports.sendMessage = async (req, res) => {
    try {
        const { adId, content } = req.body;
        const senderId = req.user.userId;

        const ad = await Ad.findByPk(adId);
        if (!ad) {
            return res.status(404).json({ message: 'Ad not found' });
        }

        const receiverId = ad.userId;
        if (receiverId === senderId) {
            return res.status(400).json({ message: 'You cannot send a message to yourself' });
        }

        const message = await Message.create({
            adId,
            senderId,
            receiverId,
            content,
        });

        const fullMessage = await Message.findByPk(message.id, {
            include: [
                { model: User, as: 'sender', attributes: ['id', 'username', 'email'] },
                { model: User, as: 'receiver', attributes: ['id', 'username', 'email'] },
            ]
        });

        res.status(201).json({ message: 'Message sent successfully', data: fullMessage });
    } catch (error) {
        res.status(500).json({ message: 'Failed to send message', error });
    }
};

exports.getMessages = async (req, res) => {
    try {
        const { adId } = req.params;
        const userId = req.user.userId;

        const ad = await Ad.findByPk(adId);
        if (!ad) {
            return res.status(404).json({ message: 'Ad not found' });
        }

        const messages = await Message.findAll({
            where: {
                adId,
                [Op.or]: [
                    { senderId: userId },
                    { receiverId: userId }
                ]
            },
            order: [['createdAt', 'ASC']],
            include: [
                { model: User, as: 'sender', attributes: ['id', 'username', 'email'] },
                { model: User, as: 'receiver', attributes: ['id', 'username', 'email'] },
            ]
        });

        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch messages', error });
    }
};
