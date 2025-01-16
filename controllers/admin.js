const User= require('../models/User');
const Ad= require('../models/Ad');

exports.deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await user.destroy();
        res.status(200).json({ message: 'User deleted successfully, along with related ads' });
    } catch (error) {
        console.error('Failed to delete user:', error);
        res.status(500).json({ message: 'Failed to delete user', error: error.message });
    }
};

exports.deleteAd = async (req, res) => {
    try {
        const { adId } = req.params;

        const ad = await Ad.findByPk(adId);
        if (!ad) {
            return res.status(404).json({ message: 'Ad not found' });
        }

        await ad.destroy();
        res.status(200).json({ message: 'Ad deleted successfully' });
    } catch (error) {
        console.error('Failed to delete ad:', error);
        res.status(500).json({ message: 'Failed to delete ad', error: error.message });
    }
};
