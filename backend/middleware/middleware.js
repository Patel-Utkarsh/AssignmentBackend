const jwt = require("jsonwebtoken");

exports.middleware = async (req, res, next) => {
    try {
        const token = req.cookies.vercel-feature-flags ||req.cookies.tokenCookie ;

        // Check if token is present
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'No token provided, authorization denied'
            });
        }

        
        const decoded = jwt.verify(token, 'abc');
        req.user_id = decoded.id; 

        next();  // Proceed to the next middleware

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Invalid or expired token'
        });
    }
};
