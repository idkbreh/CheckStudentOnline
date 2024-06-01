const express = require('express');
const router = express.Router();
const crypto = require('crypto');

router.get('/login', (req, res) => {
  const error = req.query.error;
  res.render('login', { error });
});

router.post('/login', (req, res) => {
  const password = process.env.APP_PASSWORD;
  const providedPassword = req.body.password;

  if (providedPassword && providedPassword === password) {
    const token = crypto.randomBytes(64).toString('hex');
    res.cookie('auth_token', token, { httpOnly: true, secure: true });
    req.session.token = token;
    res.json({ token }); 
  } else {
    res.redirect('/login?error=incorrect');
  }
});

module.exports = router;
