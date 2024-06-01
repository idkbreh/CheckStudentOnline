const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
  const error = req.query.error;
  res.render('login', { error });
});

router.post('/login', (req, res) => {
  const password = process.env.APP_PASSWORD;
  const providedPassword = req.body.password;

  if (providedPassword && providedPassword === password) {
    res.cookie('auth_token', 'tester123');
    res.redirect('/');
  } else {
    res.redirect('/login?error=incorrect');
  }
});

module.exports = router;
