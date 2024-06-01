const authMiddleware = (req, res, next) => {
  const token = req.cookies.auth_token;

  if (token === 'tester123') {
    next();
  } else {
    res.redirect('/login');
  }
};

module.exports = authMiddleware;
