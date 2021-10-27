module.exports = function(req, res, next) {
    if (process.env.REQUIRES_AUTH === 'true') {
        if (!req.user.isAdmin) return res.status(403).send('Access denied.');
        next();
    }
    return next();
};