require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./database/connect.js');
const Sign = require('./routes/signup.js');
const Login = require('./routes/login.js');
const Pass = require('./routes/pass-token.js');
const Reset = require('./routes/reset-pass.js');
const Url = require('./routes/url.js');
const app = express();
const PORT = process.env.PORT;
app.listen(PORT, ()=>{
    console.log(`Server Is Running In PORT ${PORT}`)
});
app.use(cors());
db();
app.use(express.json());
const morgan = require('morgan');
app.use(morgan('dev'));
app.use("/api/users", Sign);
app.use("/login/users", Login);
app.use('/resetpassword', Pass);
app.use(Reset);
app.use(Url);
