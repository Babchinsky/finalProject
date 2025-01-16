const jwt= require('jsonwebtoken');
const bcrypt= require('bcrypt');

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;
        const tokenExpiry = process.env.JWT_EXPIRES_IN || '1h';

        if (email !== adminEmail) {
            console.log(`Failed login attempt with email: ${email}`);
            return res.status(403).json({ message: 'Access denied. Invalid credentials.' });
        }

        const isPasswordMatch = await bcrypt.compare(password, adminPasswordHash);
        if (!isPasswordMatch) {
            console.log(`Failed login attempt with email: ${email}`);
            return res.status(403).json({ message: 'Access denied. Invalid credentials.' });
        }

        const token = jwt.sign(
            { email: adminEmail, role: 'admin' },
            process.env.JWT_SECRET,
            { expiresIn: tokenExpiry }
        );

        res.status(200).json({ message: 'Admin login successful', token });
    } catch (error) {
        console.error('Error during admin login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
