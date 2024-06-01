const authMiddleware = (req, res, next) => {
  const token = req.cookies.auth_token || req.query.token || req.body.token || req.session.token;

  if (token && token === req.session.token) {
    req.session.token = token;
    next();
  } else {
    res.redirect('/login');
  }
};

module.exports = authMiddleware;
