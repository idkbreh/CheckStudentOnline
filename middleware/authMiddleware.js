const authMiddleware = (req, res, next) => {
  const password = process.env.APP_PASSWORD;
  const providedPassword = req.query.password || req.body.password || req.session.password;

  if (providedPassword && providedPassword === password) {
    req.session.password = providedPassword;
    next();
  } else {
    res.redirect('/login');
  }
};

module.exports = authMiddleware;