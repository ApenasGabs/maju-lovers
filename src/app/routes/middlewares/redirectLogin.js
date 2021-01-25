const redirectLogin = (req, res, next) => {
    if(!req.session.auth || req.session.auth == false) {
        res.redirect('/login')
    }else {
        next();
    }
}

module.exports = redirectLogin;