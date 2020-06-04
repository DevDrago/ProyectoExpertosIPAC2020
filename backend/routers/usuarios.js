const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController");
const {checkAdminType} = require("../middlewares/checkAdminType")
const {checkAuth} = require("../middlewares/checkAuth.js")

//Rutas para el administrador
router.get('/admin/usuarios', usuarioController.usuarios);
router.get('/admin/usuarios/:id', [checkAuth], usuarioController.usuario);
router.post('/admin/usuarios/crear-usuario', [checkAuth], usuarioController.crearUsuario);

//Rutas para el usuario
router.post('/usuarios/register', usuarioController.register);

//Rutas de autenticación
router.post('/usuarios/login', usuarioController.login);
router.get("/usuarios/logout", checkAuth, usuarioController.logout)

module.exports = router;