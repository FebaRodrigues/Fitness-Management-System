// middleware/auth.js
const jwt = require('jsonwebtoken');

const auth = (roles = []) => {
    return (req, res, next) => {
        const token = req.header('Authorization')?.split(' ')[1]; // Extract token from Bearer scheme
        if (!token) return res.status(401).json({ message: 'Access denied' });

        try {
            const verified = jwt.verify(token, process.env.JWT_SECRET);
            req.user = verified; // Attach user info to request

            // Check if the user's role is allowed
            if (roles.length && !roles.includes(req.user.role)) {
                return res.status(403).json({ message: 'Forbidden' });
            }

            next();
        } catch (error) {
            res.status(400).json({ message: 'Invalid token' });
        }
    };
};

module.exports = auth;