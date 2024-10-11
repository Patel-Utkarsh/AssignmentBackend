
exports.middleware = async (req, res, next) => {
    try {
        const token = req.cookies.tokenCookie ;
        console.log(token)

        // Check if token is present
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'No token provided, authorization denied'
            });
        }

    

        next();  // Proceed to the next middleware

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Invalid or expired token'
        });
    }
};
