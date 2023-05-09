const AuthUser = (req, res, next) => {
    if(!req.session.logged_in) {
        res.redirect('/profile/login')
    } else {
        next()
    }
}

module.exports = AuthUser