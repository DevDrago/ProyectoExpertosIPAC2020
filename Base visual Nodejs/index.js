var express = require('express');
var app = express();

app.use(express.static('www'));//use se utiliza para ejecutar middlewares

app.set('view engine','ejs')
app.use(express.static('public'));

//Rutas user
app.get('/', function(req, res) { res.render('user/index') });
app.get('/whois', function(req, res) { res.render('user/whois') });
app.get('/docs', function(req, res) { res.render('user/docs') });
app.get('/contact', function(req, res) { res.render('user/contact') });

//Rutas admin
app.get('/admin', function(req, res) { res.render('admin/index') });

app.listen('8888',function(){
    console.log('Servidor levantado')
});