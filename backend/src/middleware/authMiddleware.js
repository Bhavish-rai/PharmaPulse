const authMiddleware = (req, res, next) => {
    const userId = req.headers["user-id"];

    if (!userId) {
        return res.status(401).json({
            success: false,
            message: "User ID is required"
        });
    }

    req.userId = userId;

    next();
};

module.exports = authMiddleware;