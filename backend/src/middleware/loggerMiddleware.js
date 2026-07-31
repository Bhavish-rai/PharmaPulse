const logger = require("../config/logger");

const loggerMiddleware = (req, res, next) => {
    logger.info({
        method: req.method,
        url: req.originalUrl,
        ip: req.ip
    });

    next();
};

module.exports = loggerMiddleware;