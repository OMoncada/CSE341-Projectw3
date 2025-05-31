const router = require("express").Router();
const passport = require("passport");

// Tus rutas de API
router.use("/products", require("./product"));
router.use("/brands", require("./brand"));

// Autenticación con GitHub
router.get('/login', passport.authenticate('github'));

router.get('/github/callback', passport.authenticate('github', {
  failureRedirect: '/api-docs',
  session: false
}), (req, res) => {
  req.session.user = req.user;
  res.redirect('/');
});

router.get('/logout', (req, res, next) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

module.exports = router;
