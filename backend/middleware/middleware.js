const jwt = require("jsonwebtoken");

exports.middleware = async (req, res, next) => {
    try {
        console.log('cookies ',req.cookies);
        const token = req.cookies.tokenCookie ;
        console.log(token)

        // Check if token is present
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'No token provided, authorization denied'
            });
        }

    
        const idObj = jwt.verify(token,"abc");
        req.user_id = idObj.id;
         next();  // Proceed to the next middleware

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Invalid or expired token'
        });
    }
};
