module.exports = {
  logout: (req, res, next) => {
    req.session.user = false;
    next();
  },

  // ensureRedirect: (req, res, next) => {
  //   if (req.session.user != false) {
  //     return res.redirect("/dashboard");
  //   }
  //   next();
  // },

  ensureAuthenticated: (req, res, next) => {
    if (!req.session.user) {
      req.flash("error", "Please Login to View This resource");
      res.redirect("/login");
    } else {
      next();
    }
  },
};
