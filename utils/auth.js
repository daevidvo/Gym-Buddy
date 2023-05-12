// This middleware function checks if a user is authenticated by checking if they are logged in
// If the user is not logged in, they are redirected to the login page, otherwise the next middleware function is called
const AuthUser = (req, res, next) => {
    if(!req.session.logged_in) {
        res.redirect('/profile/login')
    } else {
        next()
    }
}

module.exports = AuthUser