
// middleware/auth.js
const jwt = require('jsonwebtoken');

const auth = (roles = []) => {
    return (req, res, next) => {
        const token = req.header('Authorization')?.split(' ')[1]; // Extract token
        if (!token) return res.status(401).json({ message: 'Access denied' });

        try {
            const verified = jwt.verify(token, process.env.JWT_SECRET);
            req.user = verified; // Attach user info to request

            console.log("Extracted User Role:", req.user.role); // Debug log

            if (!req.user.role) {
                return res.status(403).json({ message: "Forbidden: User role missing" });
            }

            // Check if the user's role is allowed
            if (!roles.length && !roles.includes(req.user.role)) {
                console.log("Forbidden: User role not allowed");
                return res.status(403).json({ message: 'Forbidden' });
            }

            next();
        } catch (error) {
            res.status(400).json({ message: 'Invalid token' });
        }
    };
};


module.exports = auth;










