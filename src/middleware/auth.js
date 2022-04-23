//Custom Authentication Middleware:
function ensureAuth(req, res, next) {
    if(!req.isAuthenticated()) return res.redirect("/login");
    next();
}

function ensureAdmin(req, res, next) {
    const redirParams = new URLSearchParams([...Object.entries(req.query)]).toString()
    const redirectURL = `/login?redirect=${req.originalUrl}${redirParams}`;
    if(req.isAuthenticated()) {
        if(req.user.admin == true) {
            next();
        } else {
            return res.redirect(redirectURL);
        }
    } else {
        return res.redirect(redirectURL);
    }
}

module.exports = {
    ensureAuth,
    ensureAdmin
}