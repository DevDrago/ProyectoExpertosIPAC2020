const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController");
const {checkUserType} = require("../middlewares/checkUserType")
const {checkAuth} = require("../middlewares/checkAuth.js")

router.get('/usuarios', [checkAuth,checkUserType], usuarioController.usuarios);
router.get('/usuarios/:id', [checkAuth,checkUserType], usuarioController.usuario);
router.post('/usuarios/crear-usuario', usuarioController.crearUsuario);
router.post('/usuarios/login', usuarioController.login);
router.get("/usuarios/logout", checkAuth, usuarioController.logout)

module.exports = router;