const adminController = {}
const opcionesAdmin = require('../models/opciones_admin');
const mongoose = require('mongoose');

//########### MÉTODOS ADMIN ###########//

//Lista de todas las opciones del admin
adminController.listarOpcionesAdmin = (req, res)=>{
    opcionesAdmin.find({},{_id: true, titulo:true, url: true, icono: true, color: true})
    .then(result=>{
        res.send(result);
        res.end();
    })
    .catch(error=>{
        res.send(error);
        res.end();
    });
}

// Buscar una opción específica
adminController.ListarOpcionAdmin = (req, res)=>{
    opcionesAdmin.find({_id: req.params.id}, { _id: true, titulo:true, icono: true, color: true }).then(result=>{
        res.send(result[0]);
        res.end();
    }).catch(error=>{
        res.send(error);
        res.end();
    });
}

//Creación una opción administrativa
adminController.crearOpcionAdmin = (req, res)=>{

    opcionesAdmin.find({ 
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

module.exports = adminController;