const usuarioController = {}
const usuario = require('../models/usuario');

const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const config = require('../config');

//Lista de todos los usuarios
usuarioController.usuarios = (req, res)=>{
    usuario.find({},{_id: true, nombreUsuario:true})
    .then(result=>{
        res.send(result);
        res.end();
    })
    .catch(error=>{
        res.send(error);
        res.end();
    });
}

// Buscar un usuario específico
usuarioController.usuario = (req, res)=>{
    usuario.find({_id: req.params.id}, { _id: true, nombreUsuario:true, correo: true }).then(result=>{
        res.send(result[0]);
        res.end();
    }).catch(error=>{
        res.send(error);
        res.end();
    });
}

//Registro - Creación de usuarios
usuarioController.crearUsuario = (req, res)=>{

    usuario.find({ 
        $or: [
            {nombreUsuario: { $regex: new RegExp("^" + req.body.nombreUsuario.toLowerCase(), "i") } }, 
            {correo: { $regex: new RegExp("^" + req.body.correo.toLowerCase(), "i") } }
        ] 
    }, 
    { _id: true, nombreUsuario:true, correo: true }, (err, result)=>{
        if(err){
            return res.status(500).json({
                //err
                mensaje: "Error en el servidor. Intente más tarde."
            })
        }

        if(result.length > 0) {
            return res.status(400).json({
                mensaje: "El usuario o el correo ingresado ya existen en el sistema."
            });
        } else {
            let u = new usuario(
                {
                    nombreUsuario: req.body.nombreUsuario,
                    nombre: req.body.nombre,
                    correo: req.body.correo,
                    tipoUsuario: req.body.tipoUsuario,
                    contrasenia: bcrypt.hashSync(req.body.contrasenia, 10)
                }
            );
            
            u.save({}, function(err, result) {
                if(err){
                    return res.status(500).json({
                        err
                    });
                }
                if(result){
                    let token = jwt.sign({ id: result._id }, config.secret, {expiresIn: 86400});
                    res.status(200).json({ 
                        auth: true, 
                        token: token,
                        mensaje:"Se ha creado un nuevo usuario." 
                    });
                }
            });
        }
    });

}

//Iniciar sesión
usuarioController.login = (req, res)=>{

    usuario.find({ 
        $or: [
            {nombreUsuario: { $regex: new RegExp("^" + req.body.nombreUsuario.toLowerCase(), "i") } }
        ] 
    }, 
    { _id: true, nombreUsuario:true, nombre: true, contrasenia: true, tipoUsuario: true }, (err, result)=>{
        if(err){
            return res.status(500).json({
                //err
                mensaje: "Error en el servidor. Intente más tarde."
            })
        }

        if(result.length == 0){
            return res.status(404).json({
                auth: false,
                token: null,
                mensaje: "No existe ningún usuario registrado con los datos ingresados."
            })
        } else {
            let usuario = result[0];

            if (!bcrypt.compareSync(req.body.contrasenia, usuario.contrasenia)){
                return res.status(403).json({
                    auth: false,
                    token: null,
                    mensaje: "Usuario o contraseña incorrectos."
                })
            } else {
                //req.session.idUsuario = usuario._id;
                //req.session.nombre = usuario.nombre;
                req.session.tipoUsuario = usuario.tipoUsuario;
                let token = jwt.sign({ id: usuario._id, type: usuario.tipoUsuario }, config.secret, { expiresIn: 86400});
                return res.status(200).json({
                    auth: true, 
                    token: token,
                    mensaje: "Usuario logueado."
                })
            }
        }

    });

}

//Cerrar sesión
usuarioController.logout = (req, res)=>{
    req.session.destroy();
    return res.status(200).json({
        mensaje:'Sesión terminada correctamente.'
    })
}

module.exports = usuarioController;