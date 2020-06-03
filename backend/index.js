const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
//const cookieParser = require('cookie-parser');
const session = require('express-session');
const db = require('./modules/database');
//const path = require('path');

const app = express();

app.use(cors());
//app.use(express.static(path.resolve(__dirname, '../public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(cookieParser());
app.use(session({secret:'123456', resave:true, saveUninitialized:true}));
app.use('/api', require("./routers/index"));

app.listen(8888, ()=>{
    console.log('Servidor del backend levantado en 8888.');
});