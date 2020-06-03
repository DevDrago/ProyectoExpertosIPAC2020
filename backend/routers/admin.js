const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const {checkAdminType} = require("../middlewares/checkAdminType")
const {checkAuth} = require("../middlewares/checkAuth.js")

router.get('/admin/opciones-admin', [checkAuth], adminController.listarOpcionesAdmin);
router.get('/admin/opcion-admin/:id', [checkAuth], adminController.ListarOpcionAdmin);
router.post('/admin/opciones-admin', [checkAuth], adminController.crearOpcionAdmin);

module.exports = router;