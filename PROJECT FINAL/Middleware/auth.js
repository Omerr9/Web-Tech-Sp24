const auth = (req, res, next) => {
    if (!req.session.user) {
        return res.direct('login');
    }
    res.locals.userName = req.session.user.usermame;
    next();
}

module.exports = auth;