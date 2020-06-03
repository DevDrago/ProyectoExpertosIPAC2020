const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController");
const {checkAdminType} = require("../middlewares/checkAdminType")
const {checkAuth} = require("../middlewares/checkAuth.js")

//Rutas para el administrador
router.get('/usuarios', [checkAuth,checkAdminType], usuarioController.usuarios);
router.get('/usuarios/:id', [checkAuth,checkAdminType], usuarioController.usuario);
router.post('/usuarios/crear-usuario', [checkAuth,checkAdminType], usuarioController.crearUsuario);

//Rutas para el usuario
router.post('/usuarios/register', usuarioController.register);

//Rutas de autenticación
router.post('/usuarios/login', usuarioController.login);
router.get("/usuarios/logout", checkAuth, usuarioController.logout)

module.exports = router;