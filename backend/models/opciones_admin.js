var mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);

var esquema = new mongoose.Schema(
    {
        titulo: { type: String, required: true },
        url: { type: String, required: true, trim: true },
        icono: { type: String, required: true },
        color: { type: String, required: true }
    }, 
    {
        timestamps: true
    }
);

module.exports = mongoose.model('opciones_admin', esquema, 'opciones_admin');