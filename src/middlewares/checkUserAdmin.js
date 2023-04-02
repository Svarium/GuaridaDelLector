/* module.exports = (req, res, next) =>
  req.session.user && req.session.user.rol === "admin"
    ? next()
    : res.redirect("/");
 */

    module.exports = (req, res, next) => {
        req.session.userLogin && req.session.userLogin.rol === "admin"
    ? next()
    : res.redirect("/");
    }
    