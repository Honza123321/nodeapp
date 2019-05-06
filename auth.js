module.exports = {

    requiresLogin: function (req, res, next) {
        console.log(req.url);
        if (req.session && req.session.loggedUser) {
            return next();
        } else {
            return res.redirect('/login');
        }
    }
}