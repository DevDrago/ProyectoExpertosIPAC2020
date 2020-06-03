var mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);

var esquema = new mongoose.Schema(
    {
        nombreUsuario: { type: String, required: true, trim: true, unique: true },
        nombre: { type: String, required: true, trim: true },
        correo: { type: String, required: true, trim: true, unique: true },
        tipoUsuario: { type: Number, required: true, trim: true },
        contrasenia: { type: String, required: true, trim: true },
    }, 
    {
        timestamps: true
    }
);

module.exports = mongoose.model('usuarios', esquema);