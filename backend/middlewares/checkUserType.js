let checkUserType = (req, res, next) => {
    if(req.session.tipoUsuario == 2) {
        return next();
    } else {
        res.status(401).json({
            mensaje:'Acceso no autorizado.'
        })
    }
}

module.exports ={
    checkUserType
}