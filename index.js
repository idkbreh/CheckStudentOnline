const express = require('express');
const app = express();
const flash = require('connect-flash');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const expressSession = require('express-session');
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const DBURL = process.env.DBURL;

app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(flash());
app.use(cookieParser());
app.use(cors());
app.use(expressSession({ resave: false, saveUninitialized: false, secret: "Usw@@&!sdj233" }));

// Database connect
mongoose.connect(DBURL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log('connect success');
}).catch(err => {
  console.log('connect error:', err);
});

// Import and use routes
const mainpage = require('./routes/mainPage.routes');
const loginRoute = require('./routes/login.routes');
app.use('/', mainpage);
app.use('/', loginRoute);

app.listen(PORT, () => {
  console.log(`listening at port ${PORT}`);
});